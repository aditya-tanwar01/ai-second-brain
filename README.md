# BrainBox

Your AI-powered Second Brain for notes, tasks, and intelligent productivity.

BrainBox is a full-stack AI productivity application that helps users store knowledge, manage tasks, and interact with an AI assistant using their saved information.

## Features

- Notes: Create, edit, organize, and delete personal notes.
- Tasks: Create, edit, complete, and delete tasks.
- AI Assistant: Ask questions about your notes and tasks using Google Gemini.
- AI Actions: Create notes and tasks using natural-language commands.
- Authentication: Secure signup, login, logout, and user sessions.
- Data Security: Supabase Row Level Security keeps user data isolated.
- Responsive Design: Works across desktop, tablet, and mobile devices.
- Legal Pages: Includes Privacy Policy and Terms of Service.

## Tech Stack

Next.js 16  
TypeScript  
Tailwind CSS  
Supabase  
PostgreSQL  
Google Gemini  
Git  
GitHub  
Vercel

## How It Works

User → BrainBox → Notes / Tasks / AI Assistant → Gemini AI

The AI assistant can use the user's saved notes and tasks to provide contextual responses and perform supported actions.

Example commands:

    Create a task to finish my Python assignment

    Create a note about today's meeting

## Security

BrainBox uses Supabase Authentication and PostgreSQL.

Notes and tasks are associated with the authenticated user's `user_id`. Row Level Security policies control read, insert, update, and delete access so users can access only their own data.

AI API requests are authenticated using the user's Supabase session.

## Project Structure

    ai-second-brain/
    ├── app/
    │   ├── api/
    │   │   ├── ai/
    │   │   └── tasks/
    │   ├── dashboard/
    │   ├── notes/
    │   ├── tasks/
    │   ├── ai/
    │   ├── settings/
    │   ├── login/
    │   ├── signup/
    │   ├── privacy/
    │   ├── terms/
    │   ├── page.tsx
    │   ├── layout.tsx
    │   └── favicon.ico
    ├── lib/
    │   ├── supabase.ts
    │   └── supabase-browser.ts
    ├── proxy.ts
    ├── public/
    ├── package.json
    └── README.md

## Getting Started

Clone the repository:

    git clone https://github.com/aditya-tanwar01/ai-second-brain.git

    cd ai-second-brain

Install dependencies:

    npm install

Create a `.env.local` file:

    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
    GEMINI_API_KEY=your_gemini_api_key

Start the development server:

    npm run dev

Open:

    http://localhost:3000

For a production build:

    npm run build
    npm start

## Main Routes

    /             Landing page
    /signup       Account creation
    /login        User login
    /dashboard    Main dashboard
    /notes        Notes management
    /tasks        Task management
    /ai            AI Assistant
    /settings     User settings
    /privacy      Privacy Policy
    /terms        Terms of Service

## Deployment

BrainBox is deployed using Vercel and connected to GitHub. Changes pushed to the `main` branch can automatically trigger a new production deployment.

## Future Improvements

- Semantic search
- Advanced AI memory
- Document and PDF uploads
- Voice input
- AI task planning
- Calendar integration
- Notifications
- Team workspaces
- Subscription plans
- Payment integration
- Advanced analytics

## Developer

Aditya Tanwar

GitHub: https://github.com/aditya-tanwar01/ai-second-brain

## License

This project is currently intended as a personal portfolio and learning project.

---

BrainBox — Your AI-powered Second Brain.