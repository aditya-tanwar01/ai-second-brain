import Link from "next/link";

export default function TermsPage() {
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
                    Terms of Service
                </h1>

                <p className="mt-4 text-sm text-gray-500">
                    Last updated: October 1, 2026
                </p>

                <div className="mt-10 space-y-10 text-gray-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            1. Acceptance of Terms
                        </h2>

                        <p className="mt-3 leading-7">
                            By creating an account or using BrainBox, you agree to these
                            Terms of Service. If you do not agree with these terms, please
                            do not use the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            2. Description of the Service
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox is a productivity application that provides note
                            management, task management, and AI-assisted Second Brain
                            functionality.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            3. Your Account
                        </h2>

                        <ul className="mt-4 list-disc space-y-3 pl-6 leading-7">
                            <li>You are responsible for maintaining your account security.</li>
                            <li>
                                You should provide accurate information when creating an
                                account.
                            </li>
                            <li>
                                You are responsible for activity performed through your
                                account.
                            </li>
                            <li>
                                You should notify the service operator if you believe your
                                account has been accessed without authorization.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            4. User Content
                        </h2>

                        <p className="mt-3 leading-7">
                            You retain responsibility for the notes, tasks, prompts, and
                            other content you submit to BrainBox. You must not use the
                            service to store or distribute content that violates applicable
                            laws or the rights of others.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            5. AI Features
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox's AI features generate responses based on information
                            provided to the system. AI-generated information may be
                            incomplete, inaccurate, or unsuitable for a particular purpose.
                            You are responsible for reviewing AI-generated content before
                            relying on it.
                        </p>

                        <p className="mt-3 leading-7">
                            BrainBox AI should not be treated as professional legal,
                            medical, financial, or other specialized professional advice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            6. Acceptable Use
                        </h2>

                        <p className="mt-3 leading-7">
                            You agree not to misuse BrainBox, attempt to gain unauthorized
                            access to the service, interfere with its operation, abuse
                            authentication systems, or use the service for unlawful
                            activities.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            7. Availability
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox is provided on an evolving basis and may occasionally
                            experience downtime, maintenance, bugs, or changes in
                            functionality. We do not guarantee that the service will always
                            be available or error-free.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            8. Third-Party Services
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox relies on third-party services for infrastructure,
                            authentication, database storage, hosting, and AI functionality.
                            Your use of those services through BrainBox may also be subject
                            to their respective terms and policies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            9. Intellectual Property
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox's software, branding, interface, and original content
                            are protected by applicable intellectual-property laws. These
                            Terms do not grant you ownership of BrainBox's software or
                            branding.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            10. Disclaimer
                        </h2>

                        <p className="mt-3 leading-7">
                            BrainBox is provided on an "as is" and "as available" basis to
                            the extent permitted by applicable law. No guarantee is made that
                            the service or AI-generated output will meet every user's
                            requirements or be completely accurate.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            11. Limitation of Liability
                        </h2>

                        <p className="mt-3 leading-7">
                            To the extent permitted by applicable law, BrainBox and its
                            operators will not be responsible for indirect, incidental,
                            special, or consequential losses arising from use of the
                            service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            12. Termination
                        </h2>

                        <p className="mt-3 leading-7">
                            Access to BrainBox may be suspended or terminated if the service
                            is misused, these Terms are violated, or continued access creates
                            a security or operational risk.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            13. Changes to These Terms
                        </h2>

                        <p className="mt-3 leading-7">
                            These Terms may be updated from time to time. Updated terms will
                            be published on this page with a new effective date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white">
                            14. Contact
                        </h2>

                        <p className="mt-3 leading-7">
                            For questions about these Terms, please use the support or
                            contact method provided by the BrainBox service.
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