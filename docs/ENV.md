# Environment Variables

Reference for all environment variables used by the Todo app (frontend + backend). Copy `frontend/.env.example` to `frontend/.env.local` and `backend/.env.example` to `backend/.env` then fill in values.

---

## Frontend (`frontend/.env.local`)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | No | Backend API base URL (tasks, auth, **chat**). | `http://localhost:8000` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | No | Better Auth service URL. | `http://localhost:8000` |

**Note:** `NEXT_PUBLIC_*` vars are exposed to the browser. The chat client (Spec-5) uses `NEXT_PUBLIC_API_BASE_URL` for `POST /api/{user_id}/chat`.

---

## Backend (`backend/.env`)

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `DATABASE_URL` | Yes | Neon PostgreSQL (per specs): `postgresql+asyncpg://user:password@ep-xxx.neon.tech/neondb?sslmode=require` | — |
| `BETTER_AUTH_SECRET` | Yes | Secret for JWT signing. Use a strong random value. | — |
| `ENVIRONMENT` | No | `development` / `production`. | `development` |
| `HOST` | No | Server bind address. | `0.0.0.0` |
| `PORT` | No | Server port. | `8000` |
| `RELOAD` | No | Enable auto-reload. | `true` |
| `LOG_LEVEL` | No | Logging level. | `INFO` |
| `OPENAI_API_KEY` | No** | OpenAI API key for AI chat (Spec-4). [Get key](https://platform.openai.com/api-keys). | — |
| `DEBUG` | No | Debug mode. | `false` |
| `TESTING` | No | Test mode. | `false` |

Backend uses **Neon Serverless PostgreSQL** only (SQLModel); set `DATABASE_URL` in `.env` per specs/1-backend-todo.  
\** Required only for the chat endpoint (`POST /api/{user_id}/chat`). Other API routes work without it.

---

## Quick copy

**Frontend (`.env.local`):**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

**Backend (`.env`):**
```env
DATABASE_URL=postgresql+asyncpg://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
BETTER_AUTH_SECRET=your-secret-key
ENVIRONMENT=development
OPENAI_API_KEY=
```

Set `OPENAI_API_KEY=sk-...` to enable the AI chat feature.
