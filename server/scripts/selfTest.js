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
  for (const k of ['question', 'answer']) if (!f[k].hi || !f[k].en) fail(`${f.id}: ${k} missing hi/en`);
  if (f.steps.hi.length !== f.steps.en.length) fail(`${f.id}: steps hi(${f.steps.hi.length}) != en(${f.steps.en.length})`);
  if (f.tips.hi.length !== f.tips.en.length) fail(`${f.id}: tips hi != en`);
  if (!f.keywords.length) fail(`${f.id}: no keywords`);
  for (const im of f.images) if (!fs.existsSync(path.join(media, im.src.replace('/media/', '')))) fail(`${f.id}: missing image ${im.src}`);
  if (f.video && f.video.ref && !vids.has(f.video.ref)) fail(`${f.id}: unknown video ${f.video.ref}`);
}
for (const v of c.videos) if (!fs.existsSync(path.join(media, v.url.replace('/media/', '')))) fail('missing video file ' + v.url);
console.log(`content: ${c.categories.length} categories, ${c.faqs.length} FAQs, ${c.videos.length} videos, ${c.errors.length} error codes`);

// ---- matching
const cases = [
  ['113', 'error'], ['error 5501', 'error'], ['27', 'error'], ['21b', 'error'], ['497', 'error'], ['mera sms fail ho gaya 113 error aa raha hai', 'error'],
  ['password bhool gaya', 'faq:login-forgot'], ['panel me login kaise karein', 'faq:login-how'], ['password expire ho gaya', 'faq:login-expired'],
  ['bulk sms kaise bhejein', 'faq:sms-bulk'], ['variable nahi utha raha', 'faq:sms-variable-problem'], ['hindi sms kaise bheje', 'faq:sms-unicode'],
  ['url whitelist', 'faq:url-whitelist'], ['link wala sms fail ho raha hai', 'faq:url-whitelist'], ['template me sender map kaise karein', 'faq:template-map-sender'],
  ['TM delivery me kya daalna hai', 'faq:tm-delivery'], ['group kaise banau', 'faq:group-create'], ['blacklist', 'faq:blacklist'],
  ['landing page kaise banayein', 'faq:landing-create'], ['consolidate report', 'faq:report-consolidate'], ['rcs template kaise banayein', 'faq:rcs-template-create'], ['template not found', 'faq:err-template'], ['Short Term Denial', 'error'],
  ['plain aur rich card me fark', 'faq:rcs-types'], ['api url generate', 'faq:api-generate'], ['otp verify kaise karein', 'faq:otp-verify'], ['unicode finder', 'faq:util-unicode'],
  ['short link', 'faq:util-shortlink'], ['change account manager', 'faq:util-change-am'], ['white label', 'faq:reseller-site-setting'], ['bot onboarding', 'faq:reseller-bot'],
  ['demo video', 'faq:demo-videos'], ['hello', 'none'], ['xyz abc qqq', 'none|suggest'], ['kal ka weather', 'none|suggest'],
];
for (const [q, want] of cases) {
  const r = ask(q);
  const got = r.type === 'faq' ? 'faq:' + r.faq.id : r.type;
  const ok = want.split('|').some((w) => w === got || (w === r.type));
  if (!ok) fail(`"${q}" -> ${got}${r.ids ? ' [' + r.ids.join(',') + ']' : ''} (wanted ${want})`);
  else console.log('OK ', JSON.stringify(q), '->', got);
}
process.exit(bad ? 1 : 0);
