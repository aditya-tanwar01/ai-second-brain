"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Task = {
    id: number;
    title: string;
    completed: boolean;
    created_at: string;
    user_id: string;
};

export default function Tasks() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const fetchTasks = async () => {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabaseBrowser
            .from("tasks")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("FETCH TASKS ERROR:", error);
            setLoading(false);
            return;
        }

        setTasks(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const saveTask = async () => {
        if (!title.trim()) {
            alert("Please enter a task.");
            return;
        }

        setSaving(true);

        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        if (editingId !== null) {
            const { data, error } = await supabaseBrowser
                .from("tasks")
                .update({
                    title: title.trim(),
                })
                .eq("id", editingId)
                .eq("user_id", user.id)
                .select()
                .single();

            if (error) {
                console.error("UPDATE TASK ERROR:", error);
                alert(`Failed to update task: ${error.message}`);
                setSaving(false);
                return;
            }

            setTasks((currentTasks) =>
                currentTasks.map((task) =>
                    task.id === editingId ? data : task
                )
            );

            setTitle("");
            setEditingId(null);
            setSaving(false);
            return;
        }

        const { data, error } = await supabaseBrowser
            .from("tasks")
            .insert({
                title: title.trim(),
                completed: false,
                user_id: user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("CREATE TASK ERROR:", error);
            alert(`Failed to create task: ${error.message}`);
            setSaving(false);
            return;
        }

        setTasks((currentTasks) => [data, ...currentTasks]);
        setTitle("");
        setSaving(false);
    };

    const startEdit = (task: Task) => {
        setEditingId(task.id);
        setTitle(task.title);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
    };

    const toggleTask = async (task: Task) => {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabaseBrowser
            .from("tasks")
            .update({
                completed: !task.completed,
            })
            .eq("id", task.id)
            .eq("user_id", user.id)
            .select()
            .single();

        if (error) {
            console.error("TOGGLE TASK ERROR:", error);
            alert(`Failed to update task: ${error.message}`);
            return;
        }

        setTasks((currentTasks) =>
            currentTasks.map((currentTask) =>
                currentTask.id === task.id ? data : currentTask
            )
        );
    };

    const deleteTask = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { error } = await supabaseBrowser
            .from("tasks")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            console.error("DELETE TASK ERROR:", error);
            alert(`Failed to delete task: ${error.message}`);
            return;
        }

        setTasks((currentTasks) =>
            currentTasks.filter((task) => task.id !== id)
        );

        if (editingId === id) {
            cancelEdit();
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

    const completedCount = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingCount = tasks.filter(
        (task) => !task.completed
    ).length;

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
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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

                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <section className="flex-1 p-5 sm:p-8">

                    <div className="mx-auto max-w-4xl">

                        {/* PAGE HEADER */}
                        <div className="mb-6 sm:mb-8">

                            <h1 className="text-3xl font-bold">
                                Tasks
                            </h1>

                            <p className="mt-2 text-sm text-gray-400 sm:text-base">
                                Manage everything you need to get done.
                            </p>

                        </div>

                        {/* TASK STATS */}
                        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">

                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-5">

                                <p className="text-sm text-gray-400">
                                    Pending
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    {loading ? "..." : pendingCount}
                                </p>

                            </div>

                            <div className="rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-5">

                                <p className="text-sm text-gray-400">
                                    Completed
                                </p>

                                <p className="mt-1 text-2xl font-bold">
                                    {loading ? "..." : completedCount}
                                </p>

                            </div>

                        </div>

                        {/* CREATE / EDIT TASK */}
                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">

                            <h2 className="mb-5 text-xl font-semibold">
                                {editingId !== null
                                    ? "Edit Task"
                                    : "Add a New Task"}
                            </h2>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <input
                                    type="text"
                                    placeholder="What do you need to do?"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            saveTask();
                                        }
                                    }}
                                    className="min-w-0 flex-1 rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <button
                                    onClick={saveTask}
                                    disabled={saving}
                                    className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50 sm:w-auto"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId !== null
                                            ? "Update"
                                            : "Add Task"}
                                </button>

                            </div>

                            {editingId !== null && (
                                <button
                                    onClick={cancelEdit}
                                    className="mt-3 text-sm text-gray-400 hover:text-white"
                                >
                                    Cancel editing
                                </button>
                            )}

                        </div>

                        {/* TASK LIST */}
                        <div className="mt-6 sm:mt-8">

                            {loading && (
                                <p className="text-gray-400">
                                    Loading tasks...
                                </p>
                            )}

                            {!loading && tasks.length === 0 && (
                                <div className="rounded-xl border border-dashed border-gray-700 p-8 text-center sm:p-10">

                                    <p className="text-gray-400">
                                        No tasks yet.
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Add your first task above.
                                    </p>

                                </div>
                            )}

                            {!loading && tasks.length > 0 && (
                                <div className="space-y-3">

                                    {tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`rounded-xl border bg-gray-900 p-4 sm:p-5 ${task.completed
                                                    ? "border-gray-800"
                                                    : "border-gray-700"
                                                }`}
                                        >

                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                                                {/* CHECKBOX + TITLE */}
                                                <div className="flex min-w-0 flex-1 items-start gap-3">

                                                    <button
                                                        onClick={() => toggleTask(task)}
                                                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${task.completed
                                                                ? "border-blue-500 bg-blue-600"
                                                                : "border-gray-600 hover:border-blue-500"
                                                            }`}
                                                    >
                                                        {task.completed && "✓"}
                                                    </button>

                                                    <p
                                                        className={`break-words text-base sm:text-lg ${task.completed
                                                                ? "text-gray-500 line-through"
                                                                : "text-white"
                                                            }`}
                                                    >
                                                        {task.title}
                                                    </p>

                                                </div>

                                                {/* ACTIONS */}
                                                <div className="flex gap-2 sm:shrink-0">

                                                    <button
                                                        onClick={() => startEdit(task)}
                                                        className="flex-1 rounded-lg border border-gray-700 px-4 py-2 text-sm text-blue-400 hover:bg-gray-800 sm:flex-none"
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleteTask(task.id)}
                                                        className="flex-1 rounded-lg border border-gray-700 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 sm:flex-none"
                                                    >
                                                        🗑️ Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}