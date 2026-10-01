import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
    try {
        // Check Gemini API key
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is missing from .env.local" },
                { status: 500 }
            );
        }

        // Get login token from browser
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "You must be logged in." },
                { status: 401 }
            );
        }

        const accessToken = authHeader.replace("Bearer ", "").trim();

        if (!accessToken) {
            return NextResponse.json(
                { error: "Authentication token is missing." },
                { status: 401 }
            );
        }

        // Create Supabase client using the logged-in user's token
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            }
        );

        // Get the logged-in user
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser(accessToken);

        if (userError || !user) {
            return NextResponse.json(
                { error: "Invalid or expired login session." },
                { status: 401 }
            );
        }

        // Get question
        const { question } = await request.json();

        if (!question?.trim()) {
            return NextResponse.json(
                { error: "Question is required." },
                { status: 400 }
            );
        }

        // Get only this user's notes
        const { data: notes, error: notesError } = await supabase
            .from("notes")
            .select("title, content")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (notesError) {
            console.error("NOTES ERROR:", notesError);

            return NextResponse.json(
                { error: `Notes error: ${notesError.message}` },
                { status: 500 }
            );
        }

        // Get only this user's tasks
        const { data: tasks, error: tasksError } = await supabase
            .from("tasks")
            .select("title, completed")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (tasksError) {
            console.error("TASKS ERROR:", tasksError);

            return NextResponse.json(
                { error: `Tasks error: ${tasksError.message}` },
                { status: 500 }
            );
        }

        // Convert notes into text for Gemini
        const notesText =
            notes && notes.length > 0
                ? notes
                    .map(
                        (note, index) =>
                            `Note ${index + 1}
Title: ${note.title}
Content: ${note.content}`
                    )
                    .join("\n\n")
                : "No notes saved.";

        // Convert tasks into text for Gemini
        const tasksText =
            tasks && tasks.length > 0
                ? tasks
                    .map(
                        (task, index) =>
                            `Task ${index + 1}
Title: ${task.title}
Status: ${task.completed ? "Completed" : "Pending"}`
                    )
                    .join("\n\n")
                : "No tasks saved.";

        // Gemini
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const prompt = `
You are BrainBox AI, a personal Second Brain assistant.

You have access to the user's saved notes and tasks.

IMPORTANT ACTION RULES:

If the user asks you to CREATE, ADD, or MAKE a task:

Respond EXACTLY in this format:

CREATE_TASK: <task title>

If the user asks you to SAVE, CREATE, ADD, or REMEMBER a note:

Respond EXACTLY in this format:

CREATE_NOTE: <short title> | <note content>

For normal questions, answer normally.

RULES:
- Use the user's notes and tasks as your primary source.
- Do not invent personal information.
- If something isn't available, clearly say so.
- For task questions, distinguish between completed and pending tasks.
- Give useful and concise answers.

====================
USER'S NOTES
====================

${notesText}

====================
USER'S TASKS
====================

${tasksText}

====================
USER'S QUESTION
====================

${question}

Answer the user's question using the information above.
`;

        const interaction = await ai.interactions.create({
            model: "gemini-3.7-flash",
            input: prompt,
        });

        const answer =
            interaction.output_text || "Gemini returned an empty response.";

        // CREATE TASK
        if (answer.startsWith("CREATE_TASK:")) {
            const taskTitle = answer.replace("CREATE_TASK:", "").trim();

            if (!taskTitle) {
                return NextResponse.json({
                    answer: "I couldn't determine the task title.",
                });
            }

            const { data: newTask, error: createError } = await supabase
                .from("tasks")
                .insert({
                    title: taskTitle,
                    completed: false,
                    user_id: user.id,
                })
                .select()
                .single();

            if (createError) {
                console.error("CREATE TASK ERROR:", createError);

                return NextResponse.json(
                    { error: `Failed to create task: ${createError.message}` },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                answer: `✅ Task created: "${newTask.title}"`,
                taskCreated: true,
                task: newTask,
            });
        }

        // CREATE NOTE
        if (answer.startsWith("CREATE_NOTE:")) {
            const noteData = answer.replace("CREATE_NOTE:", "").trim();

            const separatorIndex = noteData.indexOf("|");

            let title = "";
            let content = "";

            if (separatorIndex !== -1) {
                title = noteData.slice(0, separatorIndex).trim();
                content = noteData.slice(separatorIndex + 1).trim();
            } else {
                title = "AI Note";
                content = noteData;
            }

            if (!content) {
                return NextResponse.json({
                    answer: "I couldn't determine the note content.",
                });
            }

            const { data: newNote, error: createError } = await supabase
                .from("notes")
                .insert({
                    title,
                    content,
                    user_id: user.id,
                })
                .select()
                .single();

            if (createError) {
                console.error("CREATE NOTE ERROR:", createError);

                return NextResponse.json(
                    { error: `Failed to create note: ${createError.message}` },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                answer: `📝 Note created: "${newNote.title}"`,
                noteCreated: true,
                note: newNote,
            });
        }

        // NORMAL AI ANSWER
        return NextResponse.json({
            answer,
            taskCreated: false,
            noteCreated: false,
        });
    } catch (error) {
        console.error("AI ERROR:", error);

        const message =
            error instanceof Error ? error.message : String(error);

        return NextResponse.json(
            { error: `AI error: ${message}` },
            { status: 500 }
        );
    }
}
