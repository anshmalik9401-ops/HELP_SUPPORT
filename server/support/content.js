// Content loader: seed content (data/seed/*.js, data/videos.json, data/errorCodes.json)
// + admin changes (data/custom.json). Admin never edits seed files - it only writes custom.json,
// and an entry with the same id/code in custom.json overrides the seed one.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, 'data');
const SEED_DIR = path.join(DATA, 'seed');
const CUSTOM_FILE = path.join(DATA, 'custom.json');
const VERCEL_READ_ONLY_MESSAGE = 'Admin edits are disabled on Vercel (read-only filesystem). Edit the seed files in server/support/data/seed and redeploy, or use a persistent server.';

const emptyCustom = () => ({ faqs: {}, categories: {}, videos: {}, errors: {}, settings: {} });
let cache = null; // { stamp, content }

function readCustom() {
  try {
    const c = JSON.parse(fs.readFileSync(CUSTOM_FILE, 'utf8'));
    return { ...emptyCustom(), ...c };
  } catch { return emptyCustom(); }
}

function writeCustom(custom) {
  if (process.env.VERCEL) throw new Error(VERCEL_READ_ONLY_MESSAGE);
  const tmp = CUSTOM_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(custom, null, 2));
  fs.renameSync(tmp, CUSTOM_FILE);
  cache = null;
}

function loadSeed() {
  const categories = [], faqs = [];
  const files = fs.readdirSync(SEED_DIR).filter((f) => /^\d.*\.js$/.test(f)).sort();
  for (const f of files) {
    const m = require(path.join(SEED_DIR, f));
    (m.categories || []).forEach((c) => categories.push(c));
    (m.faqs || []).forEach((q) => faqs.push(q));
  }
  const videos = JSON.parse(fs.readFileSync(path.join(DATA, 'videos.json'), 'utf8'));
  const errors = JSON.parse(fs.readFileSync(path.join(DATA, 'errorCodes.json'), 'utf8'));
  return { categories, faqs, videos, errors };
}

const byKey = (list, key) => new Map(list.map((x) => [x[key], x]));

function build() {
  const seed = loadSeed();
  const custom = readCustom();

  // merge helper: custom entry with same key overrides seed; {_deleted:true} removes it; new ones are appended
  const merge = (seedList, customMap, key, order) => {
    const out = new Map(seedList.map((x) => [x[key], { ...x, source: 'seed' }]));
    for (const [k, v] of Object.entries(customMap || {})) {
      if (v._deleted) { out.delete(k); continue; }
      out.set(k, { ...(out.get(k) || {}), ...v, [key]: k, source: out.has(k) ? 'edited' : 'custom' });
    }
    const arr = [...out.values()];
    if (order) arr.sort((a, b) => (a[order] ?? 999) - (b[order] ?? 999));
    return arr;
  };

  const categories = merge(seed.categories, custom.categories, 'id', 'order');
  const videos = merge(seed.videos, custom.videos, 'id', 'order');
  const faqs = merge(seed.faqs, custom.faqs, 'id');
  const errors = merge(seed.errors, custom.errors, 'code');

  const videoById = Object.fromEntries(videos.map((v) => [v.id, v]));
  // resolve {ref:'video-id'} on faqs -> full video object
  const resolved = faqs.map((f) => {
    let video = f.video || null;
    if (video && video.ref) video = videoById[video.ref] ? { ...videoById[video.ref], ref: video.ref } : null;
    return { ...f, video };
  });
  return { categories, videos, faqs: resolved, errors, raw: { seed, custom } };
}

function getContent() {
  let stamp = 0;
  try { stamp = fs.statSync(CUSTOM_FILE).mtimeMs; } catch { /* no custom file yet */ }
  if (!cache || cache.stamp !== stamp) cache = { stamp, content: build() };
  return cache.content;
}

module.exports = { getContent, readCustom, writeCustom, DATA, VERCEL_READ_ONLY_MESSAGE };
