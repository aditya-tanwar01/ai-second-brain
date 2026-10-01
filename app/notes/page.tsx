"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

type Note = {
    id: number;
    title: string;
    content: string;
    created_at: string;
    user_id: string;
};

export default function Notes() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [mobileMenu, setMobileMenu] = useState(false);

    const fetchNotes = async () => {
        const {
            data: { user },
        } = await supabaseBrowser.auth.getUser();

        if (!user) {
            router.push("/login");
            return;
        }

        const { data, error } = await supabaseBrowser
            .from("notes")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("FETCH NOTES ERROR:", error);
            setLoading(false);
            return;
        }

        setNotes(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const saveNote = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please enter both title and content.");
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
                .from("notes")
                .update({
                    title: title.trim(),
                    content: content.trim(),
                })
                .eq("id", editingId)
                .eq("user_id", user.id)
                .select()
                .single();

            if (error) {
                console.error("UPDATE NOTE ERROR:", error);
                alert(`Failed to update note: ${error.message}`);
                setSaving(false);
                return;
            }

            setNotes((currentNotes) =>
                currentNotes.map((note) =>
                    note.id === editingId ? data : note
                )
            );

            setTitle("");
            setContent("");
            setEditingId(null);
            setSaving(false);
            return;
        }

        const { data, error } = await supabaseBrowser
            .from("notes")
            .insert({
                title: title.trim(),
                content: content.trim(),
                user_id: user.id,
            })
            .select()
            .single();

        if (error) {
            console.error("CREATE NOTE ERROR:", error);
            alert(`Failed to create note: ${error.message}`);
            setSaving(false);
            return;
        }

        setNotes((currentNotes) => [data, ...currentNotes]);
        setTitle("");
        setContent("");
        setSaving(false);
    };

    const startEdit = (note: Note) => {
        setEditingId(note.id);
        setTitle(note.title);
        setContent(note.content);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
    };

    const deleteNote = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this note?"
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
            .from("notes")
            .delete()
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            console.error("DELETE NOTE ERROR:", error);
            alert(`Failed to delete note: ${error.message}`);
            return;
        }

        setNotes((currentNotes) =>
            currentNotes.filter((note) => note.id !== id)
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
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            🏠 Dashboard
                        </Link>

                        <Link
                            href="/notes"
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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

                    </div>

                </aside>

                {/* MAIN CONTENT */}
                <section className="flex-1 p-5 sm:p-8">

                    <div className="mx-auto max-w-4xl">

                        {/* PAGE HEADER */}
                        <div className="mb-6 sm:mb-8">

                            <h1 className="text-3xl font-bold">
                                Notes
                            </h1>

                            <p className="mt-2 text-sm text-gray-400 sm:text-base">
                                Save ideas, knowledge and important information.
                            </p>

                        </div>

                        {/* NOTE FORM */}
                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">

                            <h2 className="mb-5 text-xl font-semibold">
                                {editingId !== null
                                    ? "Edit Note"
                                    : "Create a New Note"}
                            </h2>

                            <div className="space-y-4">

                                <input
                                    type="text"
                                    placeholder="Note title"
                                    value={title}
                                    onChange={(event) =>
                                        setTitle(event.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <textarea
                                    placeholder="Write your note..."
                                    value={content}
                                    onChange={(event) =>
                                        setContent(event.target.value)
                                    }
                                    rows={6}
                                    className="w-full resize-none rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <div className="flex flex-col gap-3 sm:flex-row">

                                    <button
                                        onClick={saveNote}
                                        disabled={saving}
                                        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50 sm:w-auto"
                                    >
                                        {saving
                                            ? "Saving..."
                                            : editingId !== null
                                                ? "Update Note"
                                                : "Save Note"}
                                    </button>

                                    {editingId !== null && (
                                        <button
                                            onClick={cancelEdit}
                                            className="w-full rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-300 hover:bg-gray-800 sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* NOTES LIST */}
                        <div className="mt-6 sm:mt-8">

                            {loading && (
                                <p className="text-gray-400">
                                    Loading notes...
                                </p>
                            )}

                            {!loading && notes.length === 0 && (
                                <div className="rounded-xl border border-dashed border-gray-700 p-8 text-center sm:p-10">

                                    <p className="text-gray-400">
                                        No notes yet.
                                    </p>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Create your first note above.
                                    </p>

                                </div>
                            )}

                            {!loading && notes.length > 0 && (
                                <div className="space-y-4">

                                    {notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                                        >

                                            <div className="flex flex-col gap-5">

                                                {/* NOTE CONTENT */}
                                                <div>

                                                    <h3 className="break-words text-xl font-semibold">
                                                        {note.title}
                                                    </h3>

                                                    <p className="mt-3 whitespace-pre-wrap break-words text-gray-300">
                                                        {note.content}
                                                    </p>

                                                </div>

                                                {/* ACTION BUTTONS */}
                                                <div className="flex flex-col gap-2 sm:flex-row">

                                                    <button
                                                        onClick={() => startEdit(note)}
                                                        className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm text-blue-400 hover:bg-gray-800 sm:w-auto"
                                                    >
                                                        ✏️ Edit
                                                    </button>

                                                    <button
                                                        onClick={() => deleteNote(note.id)}
                                                        className="w-full rounded-lg border border-gray-700 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 sm:w-auto"
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