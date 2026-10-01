import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
    try {
        const { title } = await request.json();

        if (!title?.trim()) {
            return NextResponse.json(
                { error: "Task title is required." },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("tasks")
            .insert({
                title: title.trim(),
                completed: false,
            })
            .select()
            .single();

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Task created successfully.",
            task: data,
        });
    } catch (error) {
        console.error("AI TASK ERROR:", error);

        return NextResponse.json(
            { error: "Failed to create task." },
            { status: 500 }
        );
    }
}