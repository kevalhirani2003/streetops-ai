// health.routes.js
// -----------------------------------------------
// Purpose: Expose GET /api/health
// The frontend calls this to verify the backend is alive.
// This is the ONLY route we need in Phase 2.
// -----------------------------------------------

import { Router } from 'express';

const router = Router();

// GET /api/health
// Returns a small JSON payload so the frontend can confirm
// the backend is reachable and running.
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'streetops-api',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
    phase: 'Phase 2 — Foundation',
  });
});

export default router;
