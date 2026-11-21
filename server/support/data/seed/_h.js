// Tiny helper to write bilingual FAQs compactly.  hi = Hinglish, en = English.
//   faq({ id, cat, q:[hi,en], a:[hi,en], steps:[[hi...],[en...]], tips:[[..],[..]],
//         img:[[ 'image-id', 'caption hi', 'caption en' ]], video:'video-id', action:'errorPrompt'|'videos', kw:'comma, separated' })
const L = (hi, en) => ({ hi, en });

const faq = (o) => ({
  id: o.id,
  category: o.cat,
  question: L(o.q[0], o.q[1]),
  answer: L(o.a[0], o.a[1]),
  steps: L((o.steps && o.steps[0]) || [], (o.steps && o.steps[1]) || []),
  tips: L((o.tips && o.tips[0]) || [], (o.tips && o.tips[1]) || []),
  images: (o.img || []).map(([f, hi, en]) => ({ src: `/media/img/${f}.png`, caption: hi ? L(hi, en) : null })),
  video: o.video ? { ref: o.video } : null,
  action: o.action || null,
  keywords: String(o.kw || '').split(',').map((s) => s.trim()).filter(Boolean),
});

module.exports = { L, faq };
