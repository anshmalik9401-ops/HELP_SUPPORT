// Admin API for the "Add more" page. Protected by ADMIN_KEY (.env) sent as header  x-admin-key.
// Changes are saved in data/custom.json (seed content is never touched).
const express = require('express');
const fs = require('fs');
const path = require('path');
const { getContent, readCustom, writeCustom } = require('./content');
const store = require('./store');
const ai = require('./ai');

const router = express.Router();
const UPLOAD_DIR = path.join(__dirname, '../public/media/uploads');
const OK_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp4', '.webm', '.pdf']);

router.use((req, res, next) => {
  const key = process.env.ADMIN_KEY;
  if (!key) return res.status(403).json({ error: 'Admin disabled: set ADMIN_KEY in server/.env' });
  if (req.get('x-admin-key') !== key) return res.status(401).json({ error: 'Wrong admin key' });
  next();
});

// raw upload (no extra dependency):  POST /admin/upload?name=photo.png   body = file bytes
router.post('/upload', express.raw({ type: '*/*', limit: '200mb' }), (req, res) => {
  const ext = path.extname(String(req.query.name || '')).toLowerCase();
  if (!OK_EXT.has(ext)) return res.status(400).json({ error: 'Allowed: ' + [...OK_EXT].join(' ') });
  if (!Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ error: 'Empty file' });
  const base = path.basename(String(req.query.name), ext).replace(/[^a-zA-Z0-9_-]+/g, '-').slice(0, 40) || 'file';
  const file = `${Date.now()}-${base}${ext}`;
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, file), req.body);
  res.json({ url: `/media/uploads/${file}` });
});

router.use(express.json({ limit: '500kb' }));

const slug = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const str = (v) => String(v ?? '').trim();
const pair = (o) => ({ hi: str(o?.hi), en: str(o?.en) });
const lines = (v) => (Array.isArray(v) ? v : String(v || '').split('\n')).map((x) => str(x)).filter(Boolean);
const pairLines = (o) => ({ hi: lines(o?.hi), en: lines(o?.en) });

function cleanFaq(b, id) {
  const video = b.video && (b.video.ref ? { ref: slug(b.video.ref) } : b.video.url ? { type: b.video.type === 'youtube' ? 'youtube' : 'file', url: str(b.video.url), title: pair(b.video.title) } : null);
  return {
    id, category: slug(b.category),
    question: pair(b.question), answer: pair(b.answer),
    steps: pairLines(b.steps), tips: pairLines(b.tips),
    images: (b.images || []).filter((i) => i && i.src).map((i) => ({ src: str(i.src), caption: i.caption ? pair(i.caption) : null })),
    video: video || null,
    action: b.action === 'errorPrompt' || b.action === 'videos' ? b.action : null,
    keywords: lines(b.keywords && !Array.isArray(b.keywords) ? String(b.keywords).replace(/,/g, '\n') : b.keywords),
  };
}

router.get('/ping', (_req, res) => res.json({ ok: true }));

router.get('/data', (_req, res) => {
  const c = getContent();
  // a video that came from a reference is sent back as {ref} so the form edits the reference, not a copy
  const faqs = c.faqs.map((f) => ({ ...f, video: f.video && f.video.ref ? { ref: f.video.ref } : f.video }));
  res.json({ categories: c.categories, videos: c.videos, faqs, errorCount: c.errors.length, customErrors: Object.keys(c.raw.custom.errors || {}) });
});

router.get('/errors', (req, res) => {
  const q = str(req.query.q).toUpperCase();
  const list = getContent().errors.filter((e) => !q || String(e.code).toUpperCase().includes(q) || String(e.description).toUpperCase().includes(q)).slice(0, 30);
  res.json(list);
});

// ---- FAQs
router.put('/faq/:id', (req, res) => {
  const id = slug(req.params.id);
  const f = cleanFaq(req.body || {}, id);
  if (!id || !f.category || !f.question.en || !f.question.hi || !f.answer.en || !f.answer.hi) return res.status(400).json({ error: 'id, category, question and answer (Hindi + English) are required' });
  const custom = readCustom(); custom.faqs[id] = f; writeCustom(custom);
  res.json({ ok: true, id });
});
router.delete('/faq/:id', (req, res) => {
  const id = slug(req.params.id);
  const custom = readCustom();
  const inSeed = getContent().raw.seed.faqs.some((f) => f.id === id);
  // ?reset=1 -> drop only the admin edit (back to the original seed answer); otherwise delete / hide it
  if (inSeed && !req.query.reset) custom.faqs[id] = { _deleted: true }; else delete custom.faqs[id];
  writeCustom(custom); res.json({ ok: true });
});

// ---- Categories (menu topics)
router.put('/category/:id', (req, res) => {
  const id = slug(req.params.id); const b = req.body || {};
  if (!id || !str(b.title?.hi) || !str(b.title?.en)) return res.status(400).json({ error: 'id and title (Hindi + English) required' });
  const custom = readCustom();
  custom.categories[id] = { id, icon: str(b.icon) || '📁', title: pair(b.title), order: Number(b.order) || 500, ...(b.special === 'videos' ? { special: 'videos' } : {}) };
  writeCustom(custom); res.json({ ok: true });
});
router.delete('/category/:id', (req, res) => {
  const id = slug(req.params.id); const custom = readCustom();
  if (getContent().raw.seed.categories.some((c) => c.id === id)) custom.categories[id] = { _deleted: true }; else delete custom.categories[id];
  writeCustom(custom); res.json({ ok: true });
});

// ---- Demo videos
router.put('/video/:id', (req, res) => {
  const id = slug(req.params.id); const b = req.body || {};
  if (!id || !str(b.url) || !str(b.title?.hi) || !str(b.title?.en)) return res.status(400).json({ error: 'id, title (Hindi + English) and url required' });
  const custom = readCustom();
  custom.videos[id] = { id, type: b.type === 'youtube' ? 'youtube' : 'file', url: str(b.url), title: pair(b.title), description: pair(b.description), order: Number(b.order) || 500 };
  writeCustom(custom); res.json({ ok: true });
});
router.delete('/video/:id', (req, res) => {
  const id = slug(req.params.id); const custom = readCustom();
  if (getContent().raw.seed.videos.some((v) => v.id === id)) custom.videos[id] = { _deleted: true }; else delete custom.videos[id];
  writeCustom(custom); res.json({ ok: true });
});

// ---- Error codes (override the explanation of a code, or add a new one)
const OWNERS = ['client', 'support', 'operator', 'none'];
router.put('/error/:code', (req, res) => {
  const code = str(req.params.code).toUpperCase().slice(0, 12); const b = req.body || {};
  if (!code || !str(b.meaning?.hi) || !str(b.meaning?.en)) return res.status(400).json({ error: 'code and meaning (Hindi + English) required' });
  const exists = getContent().errors.find((e) => String(e.code).toUpperCase() === code);
  const custom = readCustom();
  custom.errors[code] = {
    code, description: str(b.description) || (exists && exists.description) || code,
    meaning: pair(b.meaning), steps: pairLines(b.steps),
    owner: OWNERS.includes(b.owner) ? b.owner : 'support', retry: !!b.retry, reviewed: true,
    ...(exists ? {} : { alsoReportedAs: [], category: 'CUSTOM', categoryLabel: { hi: str(b.label) || 'Custom', en: str(b.label) || 'Custom' } }),
    ...(b.label && exists ? { categoryLabel: { hi: str(b.label), en: str(b.label) } } : {}),
  };
  writeCustom(custom); res.json({ ok: true });
});
router.delete('/error/:code', (req, res) => {
  const code = str(req.params.code).toUpperCase(); const custom = readCustom();
  delete custom.errors[code]; writeCustom(custom); res.json({ ok: true });
});

// questions clients typed that had no answer -> turn them into FAQs
router.get('/unanswered', async (_req, res) => res.json(await store.list('unanswered', 100)));

// ---- AI settings (switch on/off, extra notes for the AI)
const settingsView = () => {
  const st = readCustom().settings;
  return { aiEnabled: st.aiEnabled !== false, aiNotes: st.aiNotes || '', configured: ai.isConfigured(), model: ai.model() };
};
router.get('/settings', (_req, res) => res.json(settingsView()));
router.put('/settings', (req, res) => {
  const b = req.body || {};
  const custom = readCustom();
  if (typeof b.aiEnabled === 'boolean') custom.settings.aiEnabled = b.aiEnabled;
  if (typeof b.aiNotes === 'string') custom.settings.aiNotes = b.aiNotes.slice(0, 4000);
  writeCustom(custom);
  res.json(settingsView());
});
// quick check that the key / model work
router.post('/ai-test', async (_req, res) => {
  if (!ai.isConfigured()) return res.status(400).json({ error: 'GEMINI_API_KEY is not set in server/.env' });
  try { res.json({ ok: true, reply: await ai.callGemini('Reply with the single word: OK', [{ role: 'user', parts: [{ text: 'ping' }] }]) }); }
  catch (e) { res.status(502).json({ error: e.message }); }
});

module.exports = router;
