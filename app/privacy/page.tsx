import Link from "next/link";

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-gray-950 text-white">
            <header className="border-b border-gray-800 bg-gray-900">
                <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                    <Link href="/" className="text-2xl font-bold">
                        Brain<span className="text-blue-400">Box</span>
                    </Link>

                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </header>

            <article className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
                    BrainBox
                </p>

                <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
                    Privacy Policy
                </h1>

                <p className="mt-4 text-sm text-gray-500">
                    Last updated: October 1, 2026
                </p>

                <div className="mt-10 space-y-10 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            1. Introduction
                        </h2>
                        <p className="mt-3 leading-7">
                            BrainBox is a personal productivity and Second Brain application
                            that allows users to store notes, manage tasks, and interact with
                            an AI assistant. This Privacy Policy explains what information
                            BrainBox may collect, how it is used, and how it is protected.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            2. Information We Collect
                        </h2>

                        <div className="mt-4 space-y-4 leading-7">
                            <p>
                                <strong className="text-white">Account information:</strong>{" "}
                                When you create an account, BrainBox may collect your email
                                address and authentication information.
                            </p>

                            <p>
                                <strong className="text-white">Notes and tasks:</strong>{" "}
                                Information that you voluntarily save in BrainBox, including
                                notes, task titles, task status, and related timestamps, may be
                                stored in order to provide the application's functionality.
                            </p>

                            <p>
                                <strong className="text-white">AI requests:</strong>{" "}
                                Questions and instructions submitted to the BrainBox AI
                                assistant may be processed by the AI service used by the
                                application in order to generate a response or perform an
                                authorized action.
                            </p>

                            <p>
                                <strong className="text-white">Technical information:</strong>{" "}
                                Basic technical information may be processed by the hosting and
                                infrastructure providers used to operate BrainBox.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            3. How We Use Information
                        </h2>

                        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7">
                            <li>To create and maintain your BrainBox account.</li>
                            <li>To store and display your notes and tasks.</li>
                            <li>To provide AI-assisted features.</li>
                            <li>To authenticate users and protect accounts.</li>
                            <li>To maintain, troubleshoot, and improve the service.</li>
                            <li>To prevent misuse or unauthorized access.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            4. AI Processing
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox uses an external AI service to provide AI functionality.
                            Information relevant to an AI request may be sent to that service
                            for processing. You should avoid entering highly sensitive,
                            confidential, or unnecessary personal information into BrainBox
                            or AI prompts.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            5. Data Storage and Security
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox uses third-party infrastructure and database services to
                            store application data. Reasonable technical measures are used to
                            protect account and application data. However, no internet-based
                            service can guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            6. Data Sharing
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox does not intend to sell your personal information.
                            Information may be processed by infrastructure, authentication,
                            hosting, database, and AI service providers when necessary to
                            operate BrainBox.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            7. Your Data
                        </h2>

                        <p className="mt-3 leading-7">
                            You are responsible for the information you choose to store in
                            BrainBox. If you want to request access, correction, or deletion
                            of your account information, use the available account controls
                            or contact the BrainBox operator through the support channel
                            provided with the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            8. Cookies and Similar Technologies
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox may use browser storage, authentication cookies, or
                            similar technologies that are necessary to keep you signed in
                            and provide application functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            9. Children's Privacy
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox is not intended for children who are not legally
                            permitted to use the service under applicable law. We do not
                            knowingly collect personal information from children in violation
                            of applicable requirements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            10. Changes to This Policy
                        </h2>

                        <p className="mt-3 leading-7">
                            This Privacy Policy may be updated from time to time. Changes
                            will be reflected on this page with an updated date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            11. Contact
                        </h2>

                        <p className="mt-3 leading-7">
                            For privacy-related questions or requests, please use the support
                            or contact method provided by the BrainBox service.
                        </p>
                    </section>
                </div>
            </article>

            <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
                © 2026 BrainBox. All rights reserved.
            </footer>
        </main>
    );
}