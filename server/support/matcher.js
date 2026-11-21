// Finds the best answer for free text: error code -> FAQ -> error description -> suggestions -> none
const { getContent } = require('./content');

let derived = null; // rebuilt whenever content changes
function ctx() {
  const content = getContent();
  if (!derived || derived.content !== content) {
    derived = { content, errorMap: new Map(content.errors.map((e) => [String(e.code).toUpperCase(), e])) };
  }
  return derived;
}

const STOP = new Set(('a an the is are was be to of in on for and or my me i we you it this that how what why when where kya hai hain ka ki ke ko se me mein par pe aur ya kaise kyun kyu kab kahan nahi nhi ho hoga hota kar karna karein karo kare raha rha rahi gaya gaya hua hu hoon mera meri mere hume hamara please pls bhai sir mam can do does did not no').split(' '));
const TRIGGER = /\b(error|err|errorcode|code|status code|dlr code)\b/i;
const COUNT_WORDS = /^(sms|msg|msgs|message|messages|numbers|number|contacts|contact|credits|credit|recipients|mobile|mobiles|users)$/i;

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9ऀ-ॿ\s]/g, ' ').replace(/\s+/g, ' ').trim();
const words = (s) => norm(s).split(' ').filter((w) => w && !STOP.has(w));

function findErrorCodes(raw) {
  const { errorMap } = ctx();
  const text = String(raw || '').trim();
  const tokens = text.split(/[\s,;:/|()\-]+/).filter(Boolean);
  const hasTrigger = TRIGGER.test(text);
  const stripped = tokens.filter((t) => !TRIGGER.test(t) && !/^(is|ka|ke|ki|hai|matlab|meaning|kya|what|mean|means|aa|raha|rha|aaya|show|dikha|rahi)$/i.test(t));
  const codeOnly = stripped.length > 0 && stripped.length <= 3 && stripped.every((t) => /^[0-9a-f]{2,4}$/i.test(t)) && tokens.length <= 4;
  if (!hasTrigger && !codeOnly) return [];
  const found = [];
  tokens.forEach((t, i) => {
    if (!/^[0-9a-f]{2,4}$/i.test(t) || !/\d/.test(t)) return;
    if (tokens[i + 1] && COUNT_WORDS.test(tokens[i + 1])) return; // "100 sms" is a quantity, not a code
    const up = t.toUpperCase();
    const hit = errorMap.get(up) || errorMap.get(up.padStart(3, '0'));
    if (hit && !found.includes(hit)) found.push(hit);
  });
  return found.slice(0, 3);
}

function scoreFaq(faq, userNorm, userWords) {
  let score = 0;
  for (const k of faq.keywords || []) {
    const kn = norm(k);
    if (!kn) continue;
    if (kn.includes(' ')) { if (userNorm.includes(kn)) score += 3 + kn.split(' ').length; }
    else if (userWords.includes(kn)) score += 2;
  }
  const qWords = new Set([...words(faq.question.hi), ...words(faq.question.en)]);
  for (const w of userWords) if (qWords.has(w)) score += 1;
  return score;
}

function searchErrorsByText(raw) {
  const { content } = ctx();
  const q = norm(raw);
  const uw = words(raw).filter((w) => w.length > 2);
  if (q.length < 5 || uw.length < 1) return [];
  const scored = content.errors.map((e) => {
    const hay = norm([e.description, ...(e.alsoReportedAs || [])].join(' ').replace(/_/g, ' '));
    let s = 0;
    if (hay.includes(q)) s += 10;
    const hw = new Set(hay.split(' '));
    const hit = uw.filter((w) => hw.has(w)).length;
    if (hit >= 2 || (uw.length === 1 && hit === 1 && uw[0].length > 5)) s += hit * 2;
    return { e, s };
  }).filter((x) => x.s >= 4).sort((a, b) => b.s - a.s);
  return scored.slice(0, 3);
}

function ask(text) {
  const { content } = ctx();
  const clean = String(text || '').slice(0, 500);
  if (!clean.trim()) return { type: 'none' };

  const codes = findErrorCodes(clean);
  if (codes.length) return { type: 'error', matches: codes };

  const un = norm(clean), uw = words(clean);
  const byText = searchErrorsByText(clean);
  const ranked = content.faqs.map((f) => ({ f, s: scoreFaq(f, un, uw) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s);
  // a clear FAQ match wins; otherwise an exact phrase from an operator error description is answered as an error code
  if (byText.length && byText[0].s >= 10 && un.length >= 8 && !(ranked.length && ranked[0].s >= 3)) return { type: 'error', matches: byText.map((x) => x.e), fuzzy: true };
  if (ranked.length && ranked[0].s >= 2 && (ranked.length === 1 ? true : ranked[0].s >= ranked[1].s + (ranked[0].s >= 3 ? 1 : 2))) {
    return { type: 'faq', faq: ranked[0].f, related: ranked.slice(1, 3).map((x) => x.f.id) };
  }
  if (byText.length) return { type: 'error', matches: byText.map((x) => x.e), fuzzy: true };
  if (ranked.length && ranked[0].s >= 1) return { type: 'suggest', ids: ranked.slice(0, 3).map((x) => x.f.id) };
  return { type: 'none' };
}

// Top knowledge-base entries for a free-text question (used as grounding context for the AI answer)
function retrieve(text, limit = 4) {
  const { content } = ctx();
  const clean = String(text || '').slice(0, 500);
  const un = norm(clean), uw = words(clean);
  const faqs = content.faqs.map((f) => ({ f, s: scoreFaq(f, un, uw) })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.f);
  const codes = findErrorCodes(clean);
  const errors = (codes.length ? codes : searchErrorsByText(clean).map((x) => x.e)).slice(0, 3);
  return { faqs, errors };
}

const stats = () => { const { content } = ctx(); return { faqCount: content.faqs.length, errorCount: content.errors.length }; };

module.exports = { ask, findErrorCodes, retrieve, stats };
