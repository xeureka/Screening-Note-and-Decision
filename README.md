# Hiring Screening System

A streamlined, full-stack application designed to manage recruitment screening assessments. This project enables recruiters to record decisions and notes for candidates at specific application stages with real-time UI updates.

---

## 🚀 Project Overview

This project is built using a modern **monorepo-style** architecture focusing on type-safety, developer experience, and performance. It allows for seamless data flow between a high-performance Bun-powered backend and a reactive TanStack-powered frontend.

### Frontend (React + Vite)

The frontend is a specialized Single Page Application (SPA) built for speed and reliability.

- **TanStack Router:** Provides type-safe, file-based routing.
- **TanStack Query:** Manages server state, caching, and automatic re-fetching.
- **Lucide React:** A clean icon set for a professional UI.
- **Tailwind CSS:** Modern dark-themed styling for a dev-centric feel.

### Backend (Hono + Bun)

The backend is a lightweight, high-performance API.

- **Hono:** A fast, standard-compliant web framework.
- **Bun:** The runtime, package manager, and test runner.
- **Drizzle ORM:** Type-safe SQL companion for PostgreSQL.
- **Zod:** Strict schema validation for incoming API requests.

---

## 📂 Folder Structure

```text
├── backend
│   ├── src
│   │   ├── db                  # Drizzle configuration and PostgreSQL schema
│   │   │   └── schema
│   │   │       └── screening-decision.ts
│   │   ├── lib                 # Permissions and shared utilities
│   │   └── routes              # Modular API routes (Hiring > Screening)
│   ├── index.ts                # Main entry point
│   └── drizzle.config.ts       # Database migration settings
└── frontend
    ├── src
    │   ├── lib                 # API client (Fetch/Axios wrappers)
    │   ├── routes              # File-based routing (screening.$stageId.tsx)
    │   └── main.tsx            # App entry point
    └── vite.config.ts          # Vite/React configuration


```
