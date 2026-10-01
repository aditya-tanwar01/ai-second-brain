import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <Link href="/" className="text-2xl font-bold">
            Brain<span className="text-blue-400">Box</span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="text-gray-300 hover:text-white"
            >
              Features
            </a>

            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold hover:bg-blue-500"
            >
              Dashboard
            </Link>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">

        <div className="mx-auto max-w-3xl">

          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-blue-400">
            AI Second Brain
          </p>

          <h1 className="text-5xl font-bold leading-tight md:text-6xl">
            Your thoughts.
            <br />
            Your knowledge.
            <br />
            <span className="text-blue-400">
              Powered by AI.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Store your notes, organize your thoughts, manage your tasks,
            and use AI to understand everything you've saved.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex justify-center gap-4">

            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-500"
            >
              Get Started →
            </Link>

            <a
              href="#features"
              className="rounded-lg border border-gray-700 px-7 py-3 font-semibold text-gray-200 transition hover:bg-gray-900"
            >
              Learn More ↓
            </a>

          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-gray-800 bg-gray-900/50"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
              Features
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Everything in one place
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-gray-400">
              Your personal workspace for knowledge, tasks and AI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* Notes */}
            <Link
              href="/notes"
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-7 transition hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="mb-5 text-4xl">📝</div>

              <h3 className="text-xl font-semibold">
                Smart Notes
              </h3>

              <p className="mt-3 text-gray-400">
                Capture ideas, knowledge and important information
                in one organized place.
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-400">
                Open Notes →
              </p>
            </Link>

            {/* AI */}
            <Link
              href="/dashboard"
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-7 transition hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="mb-5 text-4xl">🤖</div>

              <h3 className="text-xl font-semibold">
                AI Assistant
              </h3>

              <p className="mt-3 text-gray-400">
                Ask questions and get intelligent answers based
                on your personal knowledge.
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-400">
                Try AI →
              </p>
            </Link>

            {/* Tasks */}
            <Link
              href="/dashboard"
              className="group rounded-2xl border border-gray-800 bg-gray-950 p-7 transition hover:-translate-y-1 hover:border-blue-500"
            >
              <div className="mb-5 text-4xl">✅</div>

              <h3 className="text-xl font-semibold">
                Smart Tasks
              </h3>

              <p className="mt-3 text-gray-400">
                Keep track of your tasks and turn your ideas
                into actionable work.
              </p>

              <p className="mt-5 text-sm font-semibold text-blue-400">
                Open Dashboard →
              </p>
            </Link>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">

        <h2 className="text-4xl font-bold">
          Ready to build your Second Brain?
        </h2>

        <p className="mt-4 text-gray-400">
          Start organizing your knowledge today.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold hover:bg-blue-500"
        >
          Open BrainBox →
        </Link>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-sm text-gray-500">
        © 2026 BrainBox. Your personal AI Second Brain.
      </footer>

    </main>
  );
}