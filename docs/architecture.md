# StreetOps AI — Architecture

## Current State (Phase 2 — Foundation)

```
Browser
  │
  │  HTTP request
  ▼
React App (Vite dev server, port 5173)
  │
  │  fetch() → /api/health
  ▼
Express Server (Node.js, port 3001)
  │
  │  Returns JSON response
  ▼
React App displays result
```

**What is implemented now:**
- React frontend with a health-check button
- Express backend with a `/api/health` endpoint
- Tailwind CSS for styling
- Environment variable configuration (no real secrets yet)
- Git version control

**What is NOT implemented yet:**
- Meta Model API integration
- Agent orchestration loop
- Tool calling
- Database (Supabase)
- Authentication

---

## Planned Architecture (Phase 3–8)

```
Browser
  │
  ▼
React App
  │  POST /api/incidents/analyze
  ▼
Express Backend
  │
  ├── Input Validation
  │
  ├── Agent Orchestration Layer
  │     │
  │     ├── [1] Send report + tool definitions to Meta Model API
  │     │         (Muse Spark — muse-spark-1.3)
  │     │
  │     ├── [2] Receive model response
  │     │
  │     ├── [3] If model requests a tool call:
  │     │       │
  │     │       ├── Validate tool name and arguments (backend only)
  │     │       ├── Execute approved backend function
  │     │       └── Return tool result to model
  │     │
  │     ├── [4] Repeat until model produces final answer
  │     │       or iteration limit is reached
  │     │
  │     └── [5] Return structured result + agent step log
  │
  ├── Tool Registry (backend-only)
  │     ├── search_incidents(query, issue_type)
  │     ├── validate_work_order(incident)
  │     └── create_work_order(incident)  ← requires authorization
  │
  └── Supabase PostgreSQL
        ├── incidents table
        ├── work_orders table
        └── agent_steps table
```

---

## Key Design Decisions

| Decision | Reason |
|---|---|
| Frontend and backend are separate | Keeps secrets server-side; frontend never touches the API key |
| Tools execute on the backend only | The model cannot execute arbitrary code; we control all side effects |
| Agent steps are stored | Every agent action is auditable — important for a municipal system |
| Input validation before model call | Untrusted user input is sanitized before reaching the AI |
| Iteration limit on agent loop | Prevents runaway loops and controls API costs |

---

## Security Notes

- The Meta API key (`MODEL_API_KEY`) lives only in `server/.env`
- It is never sent to the browser, never logged, never committed to Git
- Tool arguments from the model are validated before execution
- The model cannot write to the database directly
- Work orders require explicit backend authorization rules to pass

---

## Port Reference

| Service | Port | URL |
|---|---|---|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Express) | 3001 | http://localhost:3001 |
| Health check | 3001 | http://localhost:3001/api/health |
