import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* NAVBAR */}
      <header className="border-b border-gray-800 bg-gray-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-bold">
            Brain<span className="text-blue-400">Box</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <Link
              href="/dashboard"
              className="transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/notes"
              className="transition hover:text-white"
            >
              Notes
            </Link>

            <Link
              href="/tasks"
              className="transition hover:text-white"
            >
              Tasks
            </Link>

            <Link
              href="/ai"
              className="transition hover:text-white"
            >
              AI Assistant
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-gray-700 px-4 py-2 transition hover:border-gray-500 hover:bg-gray-900"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-500"
            >
              Get Started
            </Link>
          </nav>

          <div className="flex gap-2 md:hidden">
            <Link
              href="/login"
              className="rounded-lg border border-gray-700 px-3 py-2 text-sm"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 py-24 text-center sm:py-32">
          <div className="mx-auto inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
            🧠 Your AI-powered Second Brain
          </div>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            Think less.
            <br />
            <span className="text-blue-400">Remember more.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            BrainBox helps you organize your notes, manage your tasks, and
            use AI to find and act on the information you save.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
            >
              Start Using BrainBox →
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-gray-700 px-8 py-4 font-semibold text-gray-200 transition hover:border-gray-500 hover:bg-gray-900"
            >
              Login
            </Link>
          </div>

          <p className="mt-5 text-sm text-gray-600">
            Store your knowledge. Organize your work. Ask your AI.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-gray-800 bg-gray-900/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Your personal productivity system
            </h2>

            <p className="mt-4 text-gray-400">
              Keep your knowledge, tasks, and AI assistant connected.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Notes */}
            <Link
              href="/notes"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-4xl">📝</div>

              <h3 className="mt-5 text-xl font-semibold group-hover:text-blue-400">
                Smart Notes
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Save ideas, knowledge, plans, and important information in
                one organized place.
              </p>
            </Link>

            {/* Tasks */}
            <Link
              href="/tasks"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-4xl">✅</div>

              <h3 className="mt-5 text-xl font-semibold group-hover:text-blue-400">
                Task Manager
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Create, complete, edit, and organize your tasks from one
                simple workspace.
              </p>
            </Link>

            {/* AI */}
            <Link
              href="/ai"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-4xl">🤖</div>

              <h3 className="mt-5 text-xl font-semibold group-hover:text-blue-400">
                AI Assistant
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Ask questions about your notes and tasks and let AI help you
                manage your Second Brain.
              </p>
            </Link>

            {/* Secure */}
            <Link
              href="/settings"
              className="group rounded-2xl border border-gray-800 bg-gray-900 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="text-4xl">🔐</div>

              <h3 className="mt-5 text-xl font-semibold group-hover:text-blue-400">
                Private Workspace
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Your account-based workspace keeps your notes and tasks tied
                to your authenticated account.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Simple workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              How BrainBox works
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <div className="text-3xl font-bold text-blue-400">01</div>

              <h3 className="mt-5 text-xl font-semibold">
                Capture
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Add your notes, ideas, information, and tasks to BrainBox.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <div className="text-3xl font-bold text-blue-400">02</div>

              <h3 className="mt-5 text-xl font-semibold">
                Organize
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Keep everything organized inside your personal workspace.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-7">
              <div className="text-3xl font-bold text-blue-400">03</div>

              <h3 className="mt-5 text-xl font-semibold">
                Ask AI
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                Ask BrainBox AI about your saved information or ask it to
                create tasks and notes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-y border-gray-800 bg-blue-600/10">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Build your Second Brain today.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Start organizing your knowledge and let BrainBox AI help you turn
            information into action.
          </p>

          <div className="mt-8">
            <Link
              href="/signup"
              className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-500"
            >
              Create Your Account →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 bg-gray-950 px-6 py-10">
        <div className="mx-auto max-w-6xl text-center">
          <Link href="/" className="text-xl font-bold">
            Brain<span className="text-blue-400">Box</span>
          </Link>

          <p className="mt-2 text-sm text-gray-500">
            Your AI-powered Second Brain.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-gray-400 transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-gray-400 transition hover:text-white"
            >
              Terms of Service
            </Link>

            <Link
              href="/login"
              className="text-gray-400 transition hover:text-white"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="text-gray-400 transition hover:text-white"
            >
              Create Account
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-600">
            © 2026 BrainBox. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}