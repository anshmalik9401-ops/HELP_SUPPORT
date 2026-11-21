// Mount in any Express app:  app.use('/api/support', require('./support/router'));
// It also serves screenshots/videos at  <mount>/media/...  so nothing else has to be mounted.
const express = require('express');
const path = require('path');
const { getContent } = require('./content');
const { ask } = require('./matcher');
const store = require('./store');
const ai = require('./ai');

const router = express.Router();

const config = () => ({
  supportEmail: process.env.SUPPORT_EMAIL || 'support1@nimbusitsolutions.com',
  brandName: process.env.BRAND_NAME || 'Nimbus',
  panelUrl: process.env.PANEL_URL || 'https://omnidigital.co.in/',
  aiEnabled: ai.isEnabled(),
});

// media (screenshots, demo videos, admin uploads)
router.use('/media', express.static(path.join(__dirname, '../public/media'), { maxAge: '1h' }));

// admin API (protected by ADMIN_KEY in .env) - see admin.js
router.use('/admin', require('./admin'));

router.use(express.json({ limit: '60kb' }));

router.get('/health', (_req, res) => res.json({ ok: true }));

// All content (small) - frontend answers menu clicks locally.
router.get('/content', (_req, res) => {
  const c = getContent();
  res.json({ config: config(), categories: c.categories, videos: c.videos, faqs: c.faqs });
});

// Free text typed by the client.
router.post('/ask', async (req, res) => {
  const { text, lang = 'en', sessionId = null } = req.body || {};
  if (typeof text !== 'string' || !text.trim()) return res.status(400).json({ error: 'text required' });
  const result = ask(text);
  if (result.type === 'none' || result.type === 'suggest') store.log({ type: 'unanswered', text: text.slice(0, 500), lang, sessionId });
  res.json(result);
});

// "Ask AI" (only when a Gemini key is set and the admin has not switched it off)
const hits = new Map(); // simple in-memory rate limit: 20 questions per 10 minutes per client
router.post('/ai', async (req, res) => {
  if (!ai.isEnabled()) return res.status(503).json({ error: 'AI is disabled' });
  const { text, lang = 'en', history = [], sessionId = null } = req.body || {};
  if (typeof text !== 'string' || !text.trim()) return res.status(400).json({ error: 'text required' });
  const id = req.ip + '|' + (sessionId || ''), now = Date.now();
  const recent = (hits.get(id) || []).filter((t) => now - t < 600000);
  if (recent.length >= 20) return res.status(429).json({ error: 'Too many questions, please try again later' });
  hits.set(id, [...recent, now]);
  try {
    const result = await ai.ask(text, lang, history);
    if (result.type === 'ai') store.log({ type: 'ai', text: text.slice(0, 500), lang, sessionId });
    res.json(result);
  } catch (e) {
    console.warn('[support] AI failed:', e.message, '| model:', ai.model());
    res.status(502).json({ error: 'AI is not available right now', detail: String(e.message || '').slice(0, 300) });
  }
});

router.post('/feedback', async (req, res) => {
  const { faqId = null, helpful, lang = 'en', sessionId = null, text = null } = req.body || {};
  await store.log({ type: 'feedback', faqId, helpful: !!helpful, lang, sessionId, text: text && String(text).slice(0, 500) });
  res.json({ ok: true });
});

module.exports = router;
