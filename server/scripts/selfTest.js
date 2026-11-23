// node scripts/selfTest.js  -> checks content integrity + matching logic
const fs = require('fs');
const path = require('path');
const { getContent } = require('../support/content');
const { ask } = require('../support/matcher');

let bad = 0;
const fail = (m) => { bad++; console.log('BAD', m); };

// ---- content integrity
const c = getContent();
const cats = new Set(c.categories.map((x) => x.id));
const vids = new Set(c.videos.map((x) => x.id));
const ids = new Set();
const media = path.join(__dirname, '../public/media');
for (const f of c.faqs) {
  if (ids.has(f.id)) fail('duplicate id ' + f.id); ids.add(f.id);
  if (!cats.has(f.category)) fail(`${f.id}: unknown category ${f.category}`);
  for (const k of ['question', 'answer']) if (!f[k].en) fail(`${f.id}: ${k} missing English text`);
  if (!Array.isArray(f.steps.en)) fail(`${f.id}: steps must be an English list`);
  if (!Array.isArray(f.tips.en)) fail(`${f.id}: tips must be an English list`);
  if (!f.keywords.length) fail(`${f.id}: no keywords`);
  for (const im of f.images) if (!fs.existsSync(path.join(media, im.src.replace('/media/', '')))) fail(`${f.id}: missing image ${im.src}`);
  if (f.video && f.video.ref && !vids.has(f.video.ref)) fail(`${f.id}: unknown video ${f.video.ref}`);
}
for (const v of c.videos) if (!fs.existsSync(path.join(media, v.url.replace('/media/', '')))) fail('missing video file ' + v.url);
console.log(`content: ${c.categories.length} categories, ${c.faqs.length} FAQs, ${c.videos.length} videos, ${c.errors.length} error codes`);

// ---- matching
const cases = [
  ['113', 'error'], ['error 5501', 'error'], ['27', 'error'], ['21b', 'error'], ['497', 'error'], ['my SMS failed with error 113', 'error'],
  ['forgot password', 'faq:login-forgot'], ['how do I log in to the panel', 'faq:login-how'], ['password expired', 'faq:login-expired'],
  ['how to send bulk SMS', 'faq:sms-bulk'],   ['Variables are not being picked up', 'faq:sms-variable-problem'], ['how to send a Unicode SMS', 'faq:sms-unicode'],
  ['URL whitelist', 'faq:url-whitelist'], ['SMS with a link failed', 'faq:url-whitelist'], ['map sender to template', 'faq:template-map-sender'],
  ['what should I enter for TM delivery', 'faq:tm-delivery'], ['how to create a group', 'faq:group-create'], ['blacklist', 'faq:blacklist'],
  ['how to create a landing page', 'faq:landing-create'], ['How do I get the Consolidate Report?', 'faq:report-consolidate'], ['how to create an RCS template', 'faq:rcs-template-create'], ['template not found', 'faq:err-template'], ['Short Term Denial', 'error'],
  ['difference between plain text and rich card', 'faq:rcs-types'], ['generate API URL', 'faq:api-generate'], ['how to verify OTP', 'faq:otp-verify'], ['Unicode Finder', 'faq:util-unicode'],
  ['short link', 'faq:util-shortlink'], ['change account manager', 'faq:util-change-am'], ['white label', 'faq:reseller-site-setting'], ['bot onboarding', 'faq:reseller-bot'],
  ['demo video', 'faq:demo-videos'], ['hello', 'none'], ['xyz abc qqq', 'none|suggest'], ['what is the weather tomorrow', 'none|suggest'],
];
for (const [q, want] of cases) {
  const r = ask(q);
  const got = r.type === 'faq' ? 'faq:' + r.faq.id : r.type;
  const ok = want.split('|').some((w) => w === got || (w === r.type));
  if (!ok) fail(`"${q}" -> ${got}${r.ids ? ' [' + r.ids.join(',') + ']' : ''} (wanted ${want})`);
  else console.log('OK ', JSON.stringify(q), '->', got);
}
process.exit(bad ? 1 : 0);
