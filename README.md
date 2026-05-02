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
## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone git@github.com:xeureka/Screening-Note-and-Decision.git
cd Screening-Note-and-Decision
```

### 2. Configure Environment

Create a `.env` file in the backend folder:

```bash
# backend/.env
DATABASE_URL=postgres://username:password@localhost:5432/hiring_db
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

### 3. Run the Backend

The backend uses [Bun](https://bun.sh/) for maximum performance.

```bash
cd backend
bun install
bun run dev
```

### 4. Run the Frontend

The frontend uses [pnpm](https://pnpm.io/) for efficient package management.

```bash
cd frontend
pnpm install
pnpm dev
```

---

## 🧪 Mock Testing & Workflow

The system uses a dynamic routing pattern. You can test different candidate screenings by simply changing the ID in the URL.

| Feature        | Action            | Endpoint / URL                                                      |
| -------------- | ---------------- | ------------------------------------------------------------------- |
| New Screening  | Open Browser     | `http://localhost:5173/screening/stage-abc-123`                     |
| Get Decision   | Auto-fetch on load | `GET /hiring/application/screening/:id/decision`                   |
| Save Decision  | Click "Save" Button | `POST /hiring/application/screening/:id/decision`                |
| Check Health   | API Status        | `http://localhost:3000/health`                                      |

---

### How it works:

- **Navigation:** When you visit a link like `/screening/stage-101`, the frontend extracts `stage-101`.
- **Initial Load:** The UI fetches any existing data for that ID from the database.
- **Interaction:** You select a decision (Pass/Fail) and write a note.
- **Submission:** Clicking "Save" sends a POST request with an `x-user-role: recruiter` header.
- **Revalidation:** Upon a successful save, the UI automatically refreshes the "Latest Saved Data" card using TanStack Query invalidation.

---

## 🛡️ Linting & Formatting

Both projects use [Biome](https://biomejs.dev/) for lightning-fast linting and formatting.

```bash
# From either directory
bun x biome check --write .
```
