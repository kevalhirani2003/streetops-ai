// HomePage.jsx
// -----------------------------------------------
// Purpose: The main landing page for StreetOps AI.
// Phase 2 goal: prove the frontend and backend talk to each other.
//
// This component:
// 1. Shows the app name and description
// 2. Has a button that calls the backend health endpoint
// 3. Shows loading → success or error state
// -----------------------------------------------

import { useState } from 'react';
import { checkBackendHealth } from '../services/api.service';

// Status can be: 'idle' | 'loading' | 'success' | 'error'
const INITIAL_STATE = {
  status: 'idle',
  data: null,
  error: null,
};

export default function HomePage() {
  const [healthState, setHealthState] = useState(INITIAL_STATE);

  async function handleHealthCheck() {
    // Prevent double-clicking
    if (healthState.status === 'loading') return;

    setHealthState({ status: 'loading', data: null, error: null });

    try {
      const data = await checkBackendHealth();
      setHealthState({ status: 'success', data, error: null });
    } catch (err) {
      setHealthState({ status: 'error', data: null, error: err.message });
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">

      {/* ── Header ─────────────────────────────────────── */}
      <header className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            S
          </div>
          <span className="font-semibold text-slate-200 tracking-tight">StreetOps AI</span>
          <span className="ml-auto text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded-full">
            Phase 2 — Foundation
          </span>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center space-y-6">

          {/* Hackathon badge */}
          <div className="inline-flex items-center gap-2 text-xs text-blue-400 bg-blue-950 border border-blue-800 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Meta Global AI Developer Hackathon 2026
          </div>

          {/* Title */}
          <h1 className="text-5xl font-extrabold tracking-tight text-white leading-tight">
            StreetOps <span className="text-blue-500">AI</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            An agentic infrastructure-maintenance assistant that converts unstructured
            street-damage reports into verified, traceable maintenance work orders.
          </p>

          {/* How it works list */}
          <div className="text-left bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-3 mt-8">
            <p className="text-sm font-semibold text-slate-300 mb-4">The agent workflow (coming in Phase 3+)</p>
            {[
              'Receive a street-maintenance report',
              'Extract structured incident information',
              'Search for duplicate incidents',
              'Decide what information is missing',
              'Validate a proposed work order',
              'Create the work order only when rules pass',
              'Store every agent step in an auditable log',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-slate-700 text-slate-400 text-xs flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-400">{step}</span>
              </div>
            ))}
          </div>

          {/* ── Health Check ───────────────────────────── */}
          <div className="pt-4 space-y-4">
            <button
              id="health-check-btn"
              onClick={handleHealthCheck}
              disabled={healthState.status === 'loading'}
              className={`
                px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200
                ${healthState.status === 'loading'
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg hover:shadow-blue-900/40'
                }
              `}
            >
              {healthState.status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Checking...
                </span>
              ) : (
                'Check Backend Health'
              )}
            </button>

            {/* Result display */}
            {healthState.status === 'success' && (
              <div id="health-success" className="bg-emerald-950 border border-emerald-800 rounded-xl p-4 text-left space-y-2">
                <p className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
                  <span>✅</span> Backend is healthy
                </p>
                <pre className="text-xs text-emerald-300/80 overflow-auto">
                  {JSON.stringify(healthState.data, null, 2)}
                </pre>
              </div>
            )}

            {healthState.status === 'error' && (
              <div id="health-error" className="bg-red-950 border border-red-800 rounded-xl p-4 text-left space-y-2">
                <p className="text-red-400 font-semibold text-sm flex items-center gap-2">
                  <span>❌</span> Backend unreachable
                </p>
                <p className="text-xs text-red-300/80">{healthState.error}</p>
                <p className="text-xs text-slate-500 mt-2">
                  Make sure the backend is running:{' '}
                  <code className="bg-slate-800 px-1 py-0.5 rounded">cd server && npm run dev</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Footer ─────────────────────────────────────── */}
      <footer className="border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-600">
        StreetOps AI · Phase 2 Foundation · Built for Meta Global AI Developer Hackathon 2026
      </footer>
    </div>
  );
}
