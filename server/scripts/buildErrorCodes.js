// Usage: node scripts/buildErrorCodes.js
// Reads source/error_codes_operator.csv -> writes support/data/errorCodes.json and source/error_codes_explained.csv
const fs = require('fs');
const path = require('path');
const { CATEGORIES, OVERRIDES, RULES } = require('./errorKnowledge');

const SRC = path.join(__dirname, '../source/error_codes_operator.csv');
const OUT_JSON = path.join(__dirname, '../support/data/errorCodes.json');
const OUT_CSV = path.join(__dirname, '../source/error_codes_explained.csv');

// ---- tiny CSV parser (handles quoted multi-line fields) ----
function parseCsv(text) {
  const rows = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"') { if (text[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
    else if (c !== '\r') cur += c;
  }
  if (cur || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

const clean = (s) => s
  .replace(/[^\x20-\x7E]/g, ' ')          // junk bytes (windows-1252 garbage)
  .replace(/(?:\s-){3,}/g, ' ')
  .replace(/-{4,}/g, '')
  .replace(/^['"\s]+|['"\s;]+$/g, '')
  .replace(/'\s*\/\s*/g, ' / ')
  .replace(/'/g, m => m)
  .replace(/\s+/g, ' ')
  .trim();

const text = fs.readFileSync(SRC, 'latin1');
const rows = parseCsv(text).slice(1).filter(r => r.length >= 2 && r[0].trim());

const map = new Map();
let duplicates = 0;
for (const r of rows) {
  const code = r[0].trim().toUpperCase();
  const rawDesc = r.slice(1).join(',');
  const cleaned = clean(rawDesc.replace(/\r?\n/g, ' '));
  if (map.has(code)) { duplicates++; if ((map.get(code).raw || '').length >= cleaned.length) continue; }
  map.set(code, { raw: cleaned });
}

const pick = (cat, ov, key) => (ov && ov[key]) || CATEGORIES[cat][key];

const out = [];
for (const [code, { raw }] of map) {
  const parts = raw.split('|').map(s => s.trim().replace(/^'+|'+$/g, '').trim()).filter(Boolean);
  const description = parts[0] || raw;
  const alt = parts.slice(1);
  const ov = OVERRIDES[code] || OVERRIDES[code.replace(/^0+(?=\d)/, '')] || null;
  const upper = raw.toUpperCase();
  let category = ov && ov.category;
  if (!category) { const rule = RULES.find(([re]) => re.test(upper)); category = rule ? rule[1] : 'OTHER'; }
  const cat = CATEGORIES[category];
  out.push({
    code,
    description,
    alsoReportedAs: alt,
    category,
    categoryLabel: cat.label,
    meaning: pick(category, ov, 'meaning'),
    steps: pick(category, ov, 'steps'),
    owner: (ov && ov.owner) || cat.owner,
    retry: ov && ov.retry !== undefined ? ov.retry : cat.retry,
    // reviewed=true -> hand-written explanation. false -> category-based generic text, please confirm with operator.
    reviewed: !!(ov && ov.meaning) || category === 'DELIVERED',
  });
}
out.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));
fs.writeFileSync(OUT_JSON, JSON.stringify(out, null, 1));

// Review sheet for the user (opens in Excel; BOM for UTF-8)
const q = (s) => '"' + String(s).replace(/"/g, '""') + '"';
const header = ['Code', 'Operator Description', 'Also Reported As', 'Category', 'Meaning (Hinglish)', 'Meaning (English)', 'Fix Steps (English)', 'Who Fixes', 'Retry Useful?', 'Hand-written?'];
const lines = [header.map(q).join(',')];
for (const e of out) lines.push([e.code, e.description, e.alsoReportedAs.join(' | '), e.categoryLabel.en, e.meaning.hi, e.meaning.en, e.steps.en.join(' / '), e.owner, e.retry ? 'Yes' : 'No', e.reviewed ? 'Yes' : 'Generic'].map(q).join(','));
fs.writeFileSync(OUT_CSV, '﻿' + lines.join('\r\n'));

const byCat = {}; out.forEach(e => byCat[e.category] = (byCat[e.category] || 0) + 1);
console.log({ rowsRead: rows.length, unique: out.length, duplicatesRemoved: duplicates, handWritten: out.filter(e => e.reviewed).length });
console.table(byCat);
