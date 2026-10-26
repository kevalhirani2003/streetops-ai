// server.js
// -----------------------------------------------
// Purpose: Start the HTTP server.
// This is the entry point Node.js runs when you do `npm run dev`.
// It imports the configured Express app from app.js and
// binds it to a port.
// -----------------------------------------------

import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

const server = app.listen(PORT, () => {
  console.log('');
  console.log('┌─────────────────────────────────────────┐');
  console.log('│        StreetOps AI — Backend           │');
  console.log('├─────────────────────────────────────────┤');
  console.log(`│  Status:  Running                       │`);
  console.log(`│  Port:    ${PORT}                          │`);
  console.log(`│  Env:     ${NODE_ENV}                 │`);
  console.log(`│  Health:  /api/health                   │`);
  console.log('└─────────────────────────────────────────┘');
  console.log('');
});

// Graceful shutdown: if Node receives SIGTERM (e.g., from a process
// manager), close the server cleanly instead of killing it hard.
process.on('SIGTERM', () => {
  console.log('[Server] Received SIGTERM — shutting down gracefully...');
  server.close(() => {
    console.log('[Server] Closed.');
    process.exit(0);
  });
});
