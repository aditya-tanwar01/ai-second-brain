"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase-browser";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);

        const { data, error } = await supabaseBrowser.auth.signUp({
            email,
            password,
        });

        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        if (data.session) {
            router.push("/dashboard");
            router.refresh();
        } else {
            alert(
                "Account created! Check your email to confirm your account."
            );
            router.push("/login");
        }

        setLoading(false);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
            <div className="w-full max-w-md">
                <Link href="/" className="text-3xl font-bold">
                    Brain<span className="text-blue-400">Box</span>
                </Link>

                <div className="mt-8 rounded-2xl border border-gray-800 bg-gray-900 p-8">
                    <h1 className="text-3xl font-bold">Create account</h1>

                    <p className="mt-2 text-gray-400">
                        Start building your Second Brain.
                    </p>

                    <div className="mt-8 space-y-5">
                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSignup();
                                    }
                                }}
                                className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
                        >
                            {loading ? "Creating account..." : "Create Account"}
                        </button>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}