# StreetOps AI

> **Status:** 🚧 Under active development — Meta Global AI Developer Hackathon 2026

StreetOps AI is an agentic infrastructure-maintenance assistant that converts unstructured street-damage reports into verified, traceable maintenance work orders using a real AI agent loop.

---

## What It Does

A citizen or field worker submits a report describing road damage, potholes, broken streetlights, or drainage issues. The AI agent:

1. Extracts structured incident information
2. Identifies missing or ambiguous data
3. Searches for duplicate incidents
4. Validates a proposed work order
5. Creates the work order only when backend rules are satisfied
6. Records every agent action in an auditable history

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express |
| Language | JavaScript (ES Modules) |
| AI | Meta Model API — Muse Spark (Phase 3+) |
| Database | Supabase PostgreSQL (Phase 4+) |

---

## Prerequisites

- Node.js v18 or higher (`node --version`)
- npm v9 or higher (`npm --version`)
- Git (`git --version`)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/kevalhirani2003/streetops-ai.git
cd streetops-ai
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Install frontend dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables

### Backend (`server/.env`)

Copy the example file and fill in your values:

```bash
cp server/.env.example server/.env
```

**Never commit your `.env` file. It contains secrets.**

### Frontend (`client/.env`)

```bash
cp client/.env.example client/.env
```

The frontend only needs the backend URL — no AI keys.

---

## Running Locally

### Start the backend (from `server/` folder)

```bash
npm run dev
```

The server starts on `http://localhost:3001`

### Start the frontend (from `client/` folder)

```bash
npm run dev
```

The app opens on `http://localhost:5173`

---

## Verify Backend Connectivity

1. Start both the backend and frontend
2. Open `http://localhost:5173` in your browser
3. Click **"Check Backend Health"**
4. You should see: `✅ Backend is healthy`

Or test the backend directly:

```bash
curl http://localhost:3001/api/health
```

Expected response:

```json
{ "status": "ok", "service": "streetops-api", "timestamp": "..." }
```

---

## Project Structure

```
streetops-ai/
├── client/          ← React frontend (Vite)
├── server/          ← Express backend (Node.js)
├── docs/            ← Architecture documentation
└── README.md
```

---

## Planned Features (Future Phases)

- [ ] Phase 3: Meta Model API integration (Muse Spark)
- [ ] Phase 4: Structured incident extraction with validation
- [ ] Phase 5: Duplicate detection tool
- [ ] Phase 6: Full agent tool-calling loop
- [ ] Phase 7: Work order creation with authorization rules
- [ ] Phase 8: Supabase database persistence
- [ ] Phase 9: Photo and voice report support

---

## Hackathon

Built for the **Meta Global AI Developer Hackathon 2026** — Indie Developer track, targeting the **Best Agentic Use-Case** prize.

---

## License

MIT
