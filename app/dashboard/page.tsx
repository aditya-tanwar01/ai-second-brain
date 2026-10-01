"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function Dashboard() {
    const router = useRouter();

    const [notesCount, setNotesCount] = useState(0);
    const [tasksCount, setTasksCount] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);

    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const loadDashboardData = async () => {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { count: notes } = await supabaseBrowser
            .from("notes")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

        const { count: tasks } = await supabaseBrowser
            .from("tasks")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

        const { count: completed } = await supabaseBrowser
            .from("tasks")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id)
            .eq("completed", true);

        setNotesCount(notes || 0);
        setTasksCount(tasks || 0);
        setCompletedTasks(completed || 0);

        setLoading(false);
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

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
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
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
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
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

                        <Link
                            href="/"
                            className="mt-2 block rounded-lg px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                            ← Back to Home
                        </Link>

                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <section className="flex-1 p-5 sm:p-8">

                    <div className="mx-auto max-w-6xl">

                        {/* HEADER */}
                        <div className="mb-8 sm:mb-10">

                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                                BrainBox
                            </p>

                            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                                Your Second Brain 🧠
                            </h1>

                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Manage your knowledge, tasks and AI assistant from one place.
                            </p>

                        </div>

                        {/* STATS */}
                        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">

                            <Link
                                href="/notes"
                                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:-translate-y-1 hover:border-blue-500 sm:p-6"
                            >

                                <div className="text-3xl">
                                    📝
                                </div>

                                <p className="mt-4 text-sm text-gray-400">
                                    My Notes
                                </p>

                                <p className="mt-1 text-3xl font-bold sm:text-4xl">
                                    {loading ? "..." : notesCount}
                                </p>

                                <p className="mt-3 text-sm text-blue-400">
                                    Open Notes →
                                </p>

                            </Link>

                            <Link
                                href="/tasks"
                                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:-translate-y-1 hover:border-blue-500 sm:p-6"
                            >

                                <div className="text-3xl">
                                    ✅
                                </div>

                                <p className="mt-4 text-sm text-gray-400">
                                    My Tasks
                                </p>

                                <p className="mt-1 text-3xl font-bold sm:text-4xl">
                                    {loading ? "..." : tasksCount}
                                </p>

                                <p className="mt-3 text-sm text-blue-400">
                                    Open Tasks →
                                </p>

                            </Link>

                            <Link
                                href="/tasks"
                                className="rounded-2xl border border-gray-800 bg-gray-900 p-5 transition hover:-translate-y-1 hover:border-blue-500 sm:p-6"
                            >

                                <div className="text-3xl">
                                    🎯
                                </div>

                                <p className="mt-4 text-sm text-gray-400">
                                    Completed Tasks
                                </p>

                                <p className="mt-1 text-3xl font-bold sm:text-4xl">
                                    {loading ? "..." : completedTasks}
                                </p>

                                <p className="mt-3 text-sm text-blue-400">
                                    View Tasks →
                                </p>

                            </Link>

                        </div>

                        {/* AI CARD */}
                        <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:mt-8 sm:p-6">

                            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                <div>

                                    <p className="text-sm font-semibold text-blue-400">
                                        🤖 AI ASSISTANT
                                    </p>

                                    <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                                        Ask your Second Brain
                                    </h2>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Ask questions about your saved notes and tasks.
                                    </p>

                                </div>

                                <Link
                                    href="/ai"
                                    className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold hover:bg-blue-500"
                                >
                                    Open AI →
                                </Link>

                            </div>

                        </div>

                        {/* QUICK ACTIONS */}
                        <div className="mt-8">

                            <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                                Quick Actions
                            </h2>

                            <div className="grid gap-4 md:grid-cols-3">

                                <Link
                                    href="/notes"
                                    className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-blue-500 sm:p-6"
                                >

                                    <div className="text-3xl">
                                        📝
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold">
                                        Create Note
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Save a new idea or piece of knowledge.
                                    </p>

                                </Link>

                                <Link
                                    href="/tasks"
                                    className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-blue-500 sm:p-6"
                                >

                                    <div className="text-3xl">
                                        ✅
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold">
                                        Add Task
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Add something you need to get done.
                                    </p>

                                </Link>

                                <Link
                                    href="/ai"
                                    className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-blue-500 sm:p-6"
                                >

                                    <div className="text-3xl">
                                        🤖
                                    </div>

                                    <h3 className="mt-4 text-lg font-semibold">
                                        Ask AI
                                    </h3>

                                    <p className="mt-2 text-sm text-gray-400">
                                        Get answers from your Second Brain.
                                    </p>

                                </Link>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}