// Thin API wrapper. apiBase = where the support router is mounted on your backend (e.g. /api/support).
export const makeApi = (apiBase) => {
  const j = async (path, opts) => {
    const r = await fetch(apiBase + path, opts);
    if (!r.ok) { const e = new Error('HTTP ' + r.status); e.status = r.status; try { e.detail = (await r.json()).detail; } catch { /* no body */ } throw e; }
    return r.json();
  };
  const post = (path, body) => j(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  return {
    content: () => j('/content'),
    ask: (text, lang, sessionId) => post('/ask', { text, lang, sessionId }),
    ai: (text, lang, history, sessionId) => post('/ai', { text, lang, history, sessionId }),
    feedback: (data) => post('/feedback', data).catch(() => {}),
    // Production serves bundled media from the frontend; Vite dev uses the local API route.
    media: (src) => (src && src.startsWith('/media/') ? (import.meta.env.DEV ? apiBase + src : src) : src),
  };
};
