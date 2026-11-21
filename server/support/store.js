// Saves unanswered queries + feedback. MongoDB if MONGO_URI is set, else logs/*.jsonl (no DB needed).
const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../logs');
let Model = null;
let initPromise = null;

async function init() {
  if (!process.env.MONGO_URI || Model) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const mongoose = require('mongoose');
      await mongoose.connect(process.env.MONGO_URI);
      Model = mongoose.models.SupportLog || mongoose.model('SupportLog', new mongoose.Schema({
        type: String, text: String, lang: String, sessionId: String, faqId: String, helpful: Boolean,
      }, { timestamps: true }));
      console.log('[support] MongoDB connected - logs will be saved in collection "supportlogs"');
    } catch (e) {
      if (process.env.VERCEL) throw e;
      console.warn('[support] MongoDB connect failed, using file logs:', e.message);
    }
  })();

  return initPromise;
}

async function log(entry) {
  const row = { ...entry, at: new Date().toISOString() };
  try {
    if (process.env.MONGO_URI) await init();
    if (Model) return await Model.create(row);
    if (process.env.VERCEL) return;
    fs.mkdirSync(LOG_DIR, { recursive: true });
    fs.appendFileSync(path.join(LOG_DIR, `${entry.type}.jsonl`), JSON.stringify(row) + '\n');
  } catch (e) { console.warn('[support] log failed:', e.message); }
}

// latest rows of a type (newest first) - used by the admin page
async function list(type, limit = 100) {
  try {
    if (process.env.MONGO_URI) await init();
    if (Model) {
      const rows = await Model.find({ type }).sort({ createdAt: -1 }).limit(limit).lean();
      return rows.map((r) => ({ text: r.text, lang: r.lang, faqId: r.faqId, helpful: r.helpful, at: r.createdAt }));
    }
    if (process.env.VERCEL) return [];
    const file = path.join(LOG_DIR, `${type}.jsonl`);
    if (!fs.existsSync(file)) return [];
    const lines = fs.readFileSync(file, 'utf8').trim().split('\n').filter(Boolean);
    return lines.slice(-limit).reverse().map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  } catch (e) {
    if (process.env.VERCEL) console.warn('[support] log read failed:', e.message);
    return [];
  }
}

module.exports = { init, log, list };
