"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Message = {
    role: "user" | "ai";
    content: string;
};

export default function AIPage() {
    const router = useRouter();

    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();

            if (!user) {
                router.push("/login");
            }
        };

        checkUser();
    }, [router]);

    const askAI = async () => {
        if (!question.trim() || loading) return;

        const userQuestion = question.trim();

        setMessages((current) => [
            ...current,
            {
                role: "user",
                content: userQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const {
                data: { session },
            } = await supabaseBrowser.auth.getSession();

            if (!session?.access_token) {
                router.push("/login");
                return;
            }

            const response = await fetch("/api/ai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({
                    question: userQuestion,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong.");
            }

            setMessages((current) => [
                ...current,
                {
                    role: "ai",
                    content: data.answer,
                },
            ]);
        } catch (error) {
            console.error("AI ERROR:", error);

            const message =
                error instanceof Error
                    ? error.message
                    : "Something went wrong.";

            setMessages((current) => [
                ...current,
                {
                    role: "ai",
                    content: `❌ ${message}`,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoggingOut(true);

        const { error } = await supabaseBrowser.auth.signOut();

        if (error) {
            console.error("LOGOUT ERROR:", error);
            alert("Failed to logout. Please try again.");
            setLoggingOut(false);
            return;
        }

        router.push("/login");
        router.refresh();
    };

    const closeMenu = () => {
        setMobileMenu(false);
    };

    return (
        <main className="min-h-screen bg-gray-950 text-white">

            {/* MOBILE HEADER */}
            <header className="flex items-center justify-between border-b border-gray-800 bg-gray-900 px-5 py-4 lg:hidden">

                <Link href="/" className="text-2xl font-bold">
                    Brain<span className="text-blue-400">Box</span>
                </Link>

                <button
                    onClick={() => setMobileMenu(!mobileMenu)}
                    className="rounded-lg border border-gray-700 px-3 py-2 text-xl"
                >
                    {mobileMenu ? "✕" : "☰"}
                </button>

            </header>

            {/* MOBILE MENU */}
            {mobileMenu && (
                <div className="border-b border-gray-800 bg-gray-900 p-4 lg:hidden">

                    <nav className="space-y-2">

                        <Link
                            href="/dashboard"
                            onClick={closeMenu}
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            href="/notes"
                            onClick={closeMenu}
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
                        >
                            📝 Notes
                        </Link>

                        <Link
                            href="/tasks"
                            onClick={closeMenu}
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
                        >
                            ✅ Tasks
                        </Link>

                        <Link
                            href="/ai"
                            onClick={closeMenu}
                            className="block rounded-lg bg-blue-600 px-4 py-3"
                        >
                            🤖 AI Assistant
                        </Link>

                        <Link
                            href="/settings"
                            onClick={closeMenu}
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
                        >
                            ⚙️ Settings
                        </Link>

                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="block w-full rounded-lg px-4 py-3 text-left text-red-400 hover:bg-gray-800 disabled:opacity-50"
                        >
                            {loggingOut
                                ? "🚪 Logging out..."
                                : "🚪 Logout"}
                        </button>

                    </nav>

                </div>
            )}

            <div className="flex min-h-[calc(100vh-73px)] lg:min-h-screen">

                {/* DESKTOP SIDEBAR */}
                <aside className="hidden w-64 shrink-0 border-r border-gray-800 bg-gray-900 p-6 lg:block">

                    <Link href="/" className="text-2xl font-bold">
                        Brain<span className="text-blue-400">Box</span>
                    </Link>

                    <nav className="mt-10 space-y-2">

                        <Link
                            href="/dashboard"
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            href="/notes"
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            📝 Notes
                        </Link>

                        <Link
                            href="/tasks"
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            ✅ Tasks
                        </Link>

                        <Link
                            href="/ai"
                            className="block rounded-lg bg-blue-600 px-4 py-3"
                        >
                            🤖 AI Assistant
                        </Link>

                        <Link
                            href="/settings"
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            ⚙️ Settings
                        </Link>

                    </nav>

                    <div className="mt-10 border-t border-gray-800 pt-6">

                        <button
                            onClick={handleLogout}
                            disabled={loggingOut}
                            className="block w-full rounded-lg px-4 py-3 text-left text-red-400 hover:bg-gray-800 hover:text-red-300 disabled:opacity-50"
                        >
                            {loggingOut
                                ? "🚪 Logging out..."
                                : "🚪 Logout"}
                        </button>

                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <section className="flex min-h-[calc(100vh-73px)] flex-1 flex-col p-5 sm:p-8 lg:min-h-screen">

                    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col">

                        {/* HEADER */}
                        <div className="mb-6">

                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                                BrainBox AI
                            </p>

                            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                                Ask your Second Brain 🤖
                            </h1>

                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Ask questions about your saved notes and tasks.
                            </p>

                        </div>

                        {/* CHAT AREA */}
                        <div className="flex min-h-[400px] flex-1 flex-col rounded-2xl border border-gray-800 bg-gray-900">

                            {/* EMPTY STATE */}
                            {messages.length === 0 && (
                                <div className="flex flex-1 items-center justify-center p-6 text-center">

                                    <div className="max-w-md">

                                        <div className="text-5xl">
                                            🧠
                                        </div>

                                        <h2 className="mt-5 text-2xl font-bold">
                                            Your AI Second Brain
                                        </h2>

                                        <p className="mt-3 text-sm leading-6 text-gray-400">
                                            Ask me about your saved notes and tasks.
                                            I can also create tasks and notes for you.
                                        </p>

                                        <div className="mt-6 flex flex-wrap justify-center gap-2">

                                            <button
                                                onClick={() =>
                                                    setQuestion("What tasks do I have pending?")
                                                }
                                                className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-blue-500 hover:text-white"
                                            >
                                                Show my pending tasks
                                            </button>

                                            <button
                                                onClick={() =>
                                                    setQuestion("Summarize my notes")
                                                }
                                                className="rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:border-blue-500 hover:text-white"
                                            >
                                                Summarize my notes
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )}

                            {/* MESSAGES */}
                            {messages.length > 0 && (
                                <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">

                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`flex ${message.role === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >

                                            <div
                                                className={`max-w-[90%] rounded-2xl px-4 py-3 sm:max-w-[80%] ${message.role === "user"
                                                        ? "bg-blue-600 text-white"
                                                        : "border border-gray-700 bg-gray-950 text-gray-200"
                                                    }`}
                                            >

                                                <p className="mb-1 text-xs font-semibold opacity-60">
                                                    {message.role === "user"
                                                        ? "You"
                                                        : "BrainBox AI"}
                                                </p>

                                                <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                                    {message.content}
                                                </p>

                                            </div>

                                        </div>
                                    ))}

                                    {/* LOADING */}
                                    {loading && (
                                        <div className="flex justify-start">

                                            <div className="rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3">

                                                <p className="text-sm text-gray-400">
                                                    BrainBox AI is thinking...
                                                </p>

                                            </div>

                                        </div>
                                    )}

                                </div>
                            )}

                            {/* INPUT */}
                            <div className="border-t border-gray-800 p-4 sm:p-5">

                                <div className="flex flex-col gap-3 sm:flex-row">

                                    <textarea
                                        value={question}
                                        onChange={(event) =>
                                            setQuestion(event.target.value)
                                        }
                                        onKeyDown={(event) => {
                                            if (
                                                event.key === "Enter" &&
                                                !event.shiftKey
                                            ) {
                                                event.preventDefault();
                                                askAI();
                                            }
                                        }}
                                        placeholder="Ask your Second Brain..."
                                        rows={2}
                                        className="min-h-[52px] flex-1 resize-none rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-sm outline-none focus:border-blue-500"
                                    />

                                    <button
                                        onClick={askAI}
                                        disabled={loading || !question.trim()}
                                        className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                                    >
                                        {loading ? "Thinking..." : "Ask AI"}
                                    </button>

                                </div>

                                <p className="mt-2 text-xs text-gray-500">
                                    Press Enter to send • Shift + Enter for a new line
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}