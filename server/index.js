// Standalone dev server. In the real panel just mount ./support/router.js in your existing server.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const store = require('./support/store');
const { stats } = require('./support/matcher');

const app = express();
app.use(cors());
app.use('/api/support', require('./support/router'));

const PORT = process.env.PORT || 5000;
store.init().finally(() => app.listen(PORT, () => {
  const s = stats();
  console.log(`[support] API on http://localhost:${PORT}  (FAQs: ${s.faqCount}, error codes: ${s.errorCount})`);
  if (!process.env.ADMIN_KEY) console.log('[support] Admin page disabled - set ADMIN_KEY in .env to use "Add more"');
}));

// Startup check: tells you right away whether Nia's configured AI provider works
(async () => {
  const ai = require('./support/ai');
  if (!ai.isConfigured()) return console.log('[support] AI: no Gemini or OpenRouter API key set - Nia is off');
  try { const r = await ai.callAI('Reply with the single word: OK', [{ role: 'user', parts: [{ text: 'ping' }] }]); console.log('[support] AI check: OK (' + ai.provider() + ') ->', r.slice(0, 20)); }
  catch (e) { console.warn('[support] AI check FAILED:', e.message); }
})();
