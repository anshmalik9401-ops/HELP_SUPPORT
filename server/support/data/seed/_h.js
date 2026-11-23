// Seed helper selects the English copy from each content tuple.
const L = (_other, english) => ({ en: english });

const faq = (o) => ({
  id: o.id,
  category: o.cat,
  question: L(o.q[0], o.q[1]),
  answer: L(o.a[0], o.a[1]),
  steps: L((o.steps && o.steps[0]) || [], (o.steps && o.steps[1]) || []),
  tips: L((o.tips && o.tips[0]) || [], (o.tips && o.tips[1]) || []),
  images: (o.img || []).map(([f, _other, english]) => ({ src: `/media/img/${f}.png`, caption: english ? L(null, english) : null })),
  video: o.video ? { ref: o.video } : null,
  action: o.action || null,
  keywords: String(o.kw || '').split(',').map((s) => s.trim()).filter(Boolean),
});

module.exports = { L, faq };
