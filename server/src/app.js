// app.js
// -----------------------------------------------
// Purpose: Configure the Express application.
// This file sets up middleware and routes but does NOT
// start the HTTP server — that is server.js's job.
//
// Why separate?
// - app.js = "what the app does"
// - server.js = "how the app starts"
// This separation makes testing easier in later phases.
// -----------------------------------------------

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import healthRouter from './routes/health.routes.js';

const app = express();

// ── Middleware ────────────────────────────────────────────
// CORS: Only allow requests from our frontend.
// We read the allowed origin from the environment variable
// so it can differ between development and production.
const allowedOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// Parse incoming JSON request bodies.
// Without this, req.body would be undefined on POST requests.
app.use(express.json({ limit: '1mb' }));

// ── Routes ────────────────────────────────────────────────
// Mount the health router at /api/health
app.use('/api/health', healthRouter);

// ── 404 Handler ───────────────────────────────────────────
// Any request that didn't match a route above lands here.
// We return a clean JSON error instead of Express's default HTML page.
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler ──────────────────────────────────
// Catches any unhandled errors thrown inside route handlers.
// We log the error on the server side but NEVER expose the
// stack trace or internal details to the client.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({
    status: 'error',
    message: 'An internal server error occurred.',
  });
});

export default app;
