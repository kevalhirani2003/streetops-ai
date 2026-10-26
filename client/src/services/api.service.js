// api.service.js
// -----------------------------------------------
// Purpose: All HTTP calls to the backend live here.
// Components never call fetch() directly — they use this service.
//
// Why?
// - One place to change the base URL
// - Easy to add auth headers later
// - Easy to mock in tests
// -----------------------------------------------

// Because vite.config.js has a proxy rule, any request to /api
// in the browser is automatically forwarded to http://localhost:3001/api
// We don't need to hardcode the backend URL in the frontend code.
const API_BASE = '/api';

/**
 * Check whether the backend is reachable and healthy.
 * Calls GET /api/health
 *
 * @returns {Promise<{status: string, service: string, timestamp: string}>}
 * @throws {Error} if the network request fails or the server returns non-OK status
 */
export async function checkBackendHealth() {
  const controller = new AbortController();
  // Timeout after 8 seconds — don't wait forever
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Is the backend running on port 3001?');
    }

    throw new Error(error.message || 'Unable to reach the backend server.');
  }
}
