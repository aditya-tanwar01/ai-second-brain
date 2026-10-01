"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function SettingsPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [loggingOut, setLoggingOut] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const {
                data: { user },
            } = await supabaseBrowser.auth.getUser();

            if (!user) {
                router.push("/login");
                return;
            }

            setEmail(user.email || "");
            setLoading(false);
        };

        getUser();
    }, [router]);

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
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800"
                        >
                            🤖 AI Assistant
                        </Link>

                        <Link
                            href="/settings"
                            onClick={closeMenu}
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                            className="block rounded-lg px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                            🤖 AI Assistant
                        </Link>

                        <Link
                            href="/settings"
                            className="block rounded-lg bg-blue-600 px-4 py-3"
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
                        <div className="mb-8 sm:mb-10">

                            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                                BrainBox
                            </p>

                            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                                Settings ⚙️
                            </h1>

                            <p className="mt-3 text-sm text-gray-400 sm:text-base">
                                Manage your BrainBox account.
                            </p>

                        </div>

                        {/* ACCOUNT */}
                        <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">

                            <h2 className="text-xl font-semibold">
                                Account
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Your account information
                            </p>

                            <div className="mt-6">

                                <label className="text-sm text-gray-400">
                                    Email Address
                                </label>

                                <div className="mt-2 break-all rounded-lg border border-gray-700 bg-gray-950 px-4 py-3">
                                    {loading ? "Loading..." : email}
                                </div>

                            </div>

                        </div>

                        {/* SECURITY */}
                        <div className="mt-6 rounded-2xl border border-gray-800 bg-gray-900 p-5 sm:p-6">

                            <h2 className="text-xl font-semibold">
                                Security
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Manage your account session.
                            </p>

                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="mt-6 w-full rounded-lg border border-red-500/40 px-6 py-3 font-semibold text-red-400 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                {loggingOut
                                    ? "Logging out..."
                                    : "🚪 Logout"}
                            </button>

                        </div>

                        {/* BACK BUTTON */}
                        <div className="mt-8">

                            <Link
                                href="/dashboard"
                                className="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold hover:bg-blue-500 sm:inline-block sm:w-auto"
                            >
                                ← Back to Dashboard
                            </Link>

                        </div>

                    </div>

                </section>

            </div>

        </main>
    );
}