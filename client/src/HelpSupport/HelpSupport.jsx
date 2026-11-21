import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { makeApi } from './api.js';
import { T, greetingWord, COMMON_CODES } from './i18n.js';
import './helpSupport.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

// support mail + the format the client should use (Subject, Query, credential, AM name, contact number)
// Nia's face (AI assistant avatar)
function NiaFace({ size = 30 }) {
  return (
    <svg className="hs-nia" width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <defs><linearGradient id="niaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#26a4e5" /><stop offset="1" stopColor="#265e9a" /></linearGradient></defs>
      <circle cx="20" cy="20" r="20" fill="url(#niaG)" />
      <rect x="9" y="12" width="22" height="17" rx="8" fill="#fff" />
      <circle cx="15.5" cy="20" r="2.4" fill="#265e9a" /><circle cx="24.5" cy="20" r="2.4" fill="#265e9a" />
      <path d="M16 25 Q20 28 24 25" stroke="#25983f" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" /><circle cx="20" cy="6" r="2" fill="#ffd166" />
    </svg>
  );
}

function MailBlock({ L, query, email }) {
  const [copied, setCopied] = useState(false);
  const f = L.fmt;
  const subject = 'Help & Support Query';
  const lines = [
    `Query: ${query || `<${f.query}>`}`,
    `User Panel Credential: <${f.cred}>`,
    `AM Name: <${f.am}>`,
    `Contact Number: <${f.contact}>`,
  ];
  const plain = `Subject: <${f.subject}>\n` + lines.join('\n');
  const copy = async () => {
    try { await navigator.clipboard.writeText(plain); } catch { /* clipboard blocked */ }
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
  return (
    <>
      <p>{L.mailIntro}</p>
      <a className="hs-mail" href={`mailto:${email}`}>✉️ {email}</a>
      <div className="hs-label">{L.mailFormatTitle}</div>
      <pre className="hs-format">{plain}</pre>
      <div className="hs-warn">🔒 {L.passwordWarn}</div>
      <div className="hs-actions">
        <button className="hs-btn" onClick={copy}>{copied ? L.copied : L.copy}</button>
        <a className="hs-btn hs-btn-primary" href={href}>{L.openMail}</a>
      </div>
      <p className="hs-more">{L.moreQuery}</p>
    </>
  );
}

/**
 * Help & Support Q&A chat.
 *   <HelpSupport apiBase="/api/support" user={{ name: 'Ansh' }} />
 * Messages are stored as data (not text) so switching language re-renders the whole chat.
 */
export default function HelpSupport({ apiBase = '/api/support', user = null, className = '' }) {
  const api = useMemo(() => makeApi(apiBase), [apiBase]);
  const [content, setContent] = useState(null);
  const [loadError, setLoadError] = useState(false);
  const [lang, setLang] = useState(null); // null until the client picks a language
  const [msgs, setMsgs] = useState([]);
  const [typing, setTyping] = useState(false);
  const [ended, setEnded] = useState(false);
  const [input, setInput] = useState('');
  const [zoom, setZoom] = useState(null);
  const [aiMode, setAiMode] = useState(false);
  const hist = useRef([]); // last turns sent to the AI as context
  const run = useRef(0);
  const idc = useRef(0);
  const sessionId = useRef(uid());
  const bottomRef = useRef(null);
  const L = T[lang || 'en'];

  const faqById = useMemo(() => Object.fromEntries((content?.faqs || []).map((f) => [f.id, f])), [content]);
  const catById = useMemo(() => Object.fromEntries((content?.categories || []).map((c) => [c.id, c])), [content]);
  const videoById = useMemo(() => Object.fromEntries((content?.videos || []).map((v) => [v.id, v])), [content]);
  const aiEnabled = !!content?.config?.aiEnabled;
  const supportEmail = content?.config?.supportEmail || 'support1@nimbusitsolutions.com';

  const push = useCallback((m) => setMsgs((p) => [...p, { id: ++idc.current, ...m }]), []);

  // bot "types" for a moment, then each message appears; returns false if the chat was reset meanwhile
  const say = useCallback(async (list, delay = 500) => {
    const token = run.current;
    for (const m of list) {
      setTyping(true);
      await sleep(delay);
      if (token !== run.current) return false;
      setTyping(false);
      push({ from: 'bot', ...m });
    }
    return true;
  }, [push]);

  const start = useCallback(() => {
    run.current += 1;
    sessionId.current = uid();
    setMsgs([]); setLang(null); setEnded(false); setInput(''); setTyping(false); setZoom(null); setAiMode(false); hist.current = [];
    say([{ kind: 'greet' }, { kind: 'chooseLang' }]);
  }, [say]);

  const load = useCallback(() => {
    setLoadError(false);
    api.content().then(setContent).catch(() => setLoadError(true));
  }, [api]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { if (content) start(); }, [content]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [msgs, typing]);
  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoom]);

  /* ---------- flow ---------- */
  const chooseLang = (l) => {
    setLang(l);
    push({ from: 'user', kind: 'userLang', l });
    say([{ kind: 'intro' }, { kind: 'categories' }]);
  };

  const pickCategory = (c) => {
    setAiMode(false);
    push({ from: 'user', kind: 'userText', text: c.title });
    if (c.special === 'videos') say([{ kind: 'videoList' }]);
    else say([{ kind: 'questions', catId: c.id }]);
  };

  const showFaq = (f, query = '') => {
    const list = [{ kind: 'faq', faqId: f.id }];
    if (f.action === 'videos') list.push({ kind: 'videoList' });
    else list.push({ kind: 'followup', faqId: f.id, query });
    say(list);
  };

  const pickFaq = (f) => {
    push({ from: 'user', kind: 'userText', text: f.question });
    showFaq(f);
  };

  const pickVideo = (v) => {
    push({ from: 'user', kind: 'userText', text: v.title });
    say([{ kind: 'video', videoId: v.id }, { kind: 'followup', faqId: 'video:' + v.id }]);
  };

  const backToMenu = () => {
    push({ from: 'user', kind: 'userText', text: { hi: 'Main menu', en: 'Main menu' } });
    say([{ kind: 'categories' }]);
  };

  // not answered -> show support mail + format, then close the chat
  const fallback = (query, reason = 'notFound') => {
    if (aiEnabled && reason === 'notFound') { say([{ kind: 'aiOffer', query: query || '' }]); return; }
    say([{ kind: reason }, { kind: 'mail', query: query || '' }, { kind: 'thanks' }]).then((done) => { if (done) setEnded(true); });
  };

  const openMailFlow = (query) => {
    push({ from: 'user', kind: 'userText', text: { hi: 'Support ko mail karna hai', en: 'I want to mail support' } });
    say([{ kind: 'mail', query: query || '' }, { kind: 'thanks' }]).then((done) => { if (done) setEnded(true); });
  };

  // ---- Ask AI
  const startAi = () => {
    push({ from: 'user', kind: 'userText', text: { hi: 'AI se poochna hai', en: 'Ask AI' } });
    setAiMode(true);
    say([{ kind: 'aiIntro' }]);
  };
  const exitAi = () => { setAiMode(false); say([{ kind: 'categories' }]); };
  const askAiThis = (query) => {
    if (!query) { startAi(); return; }
    setAiMode(true);
    sendText(query, true);
  };

  const finishChat = () => {
    push({ from: 'user', kind: 'userText', text: { hi: 'Chat khatam karein', en: 'Finish chat' } });
    say([{ kind: 'thanks' }]).then((done) => { if (done) setEnded(true); });
  };

  const answerFollowup = (m, helpful) => {
    setMsgs((p) => p.map((x) => (x.id === m.id ? { ...x, done: helpful ? 'yes' : 'no' } : x)));
    api.feedback({ faqId: m.faqId, helpful, lang, sessionId: sessionId.current });
    push({ from: 'user', kind: 'userText', text: helpful ? { hi: 'Haan', en: 'Yes' } : { hi: 'Nahi', en: 'No' } });
    if (helpful) { setAiMode(false); say([{ kind: 'glad' }, { kind: 'categories' }]); }
    else if (aiEnabled && m.faqId !== 'ai') say([{ kind: 'sorry' }, { kind: 'aiOffer', query: m.query || '' }]);
    else fallback(null, 'sorry');
  };

  const notListed = () => {
    push({ from: 'user', kind: 'userText', text: { hi: 'Mera sawal list me nahi hai', en: 'My question is not listed' } });
    fallback(null, 'notFound');
  };

  const sendAi = async (text) => {
    try {
      const r = await api.ai(text, lang, hist.current, sessionId.current);
      setTyping(false);
      if (r.type === 'error') { say([{ kind: 'errors', codes: r.matches, fuzzy: false }, { kind: 'followup', faqId: null }]); return; }
      hist.current = [...hist.current, { role: 'user', text }, { role: 'bot', text: r.text }].slice(-8);
      say(r.chat ? [{ kind: 'aiAnswer', text: r.text, chat: true, general: false, query: text, faqIds: [] }] : [{ kind: 'aiAnswer', text: r.text, general: !!r.general, query: text, faqIds: r.faqIds || [] }, { kind: 'followup', faqId: 'ai' }], 150);
    } catch (e) {
      setTyping(false);
      push({ from: 'bot', kind: e.status === 429 ? 'aiLimit' : 'aiErr', detail: e.detail || '' });
      if (e.status !== 429) setAiMode(false);
    }
  };

  const sendText = async (textArg, forceAi = false) => {
    const text = (textArg ?? input).trim();
    if (!text || !lang || ended || (typing && !forceAi)) return;
    setInput('');
    push({ from: 'user', kind: 'userRaw', raw: text });
    setTyping(true);
    if (aiMode || forceAi) { await sendAi(text); return; }
    try {
      const r = await api.ask(text, lang, sessionId.current);
      setTyping(false);
      if (r.type === 'faq') showFaq(r.faq, text);
      else if (r.type === 'error') say([{ kind: 'errors', codes: r.matches, fuzzy: !!r.fuzzy }, { kind: 'followup', faqId: null }]);
      else if (r.type === 'suggest') say([{ kind: 'suggest', ids: r.ids, query: text }]);
      else fallback(text, 'notFound');
    } catch {
      setTyping(false);
      push({ from: 'bot', kind: 'serverErr' });
    }
  };

  /* ---------- render helpers ---------- */
  const pick = (o) => (o ? o[lang || 'en'] : '');

  const renderVideo = (v) => v && (
    <div className="hs-video">
      <div className="hs-video-title">🎬 {pick(v.title) || L.video}</div>
      {v.type === 'youtube'
        ? <iframe src={v.url} title="video" allowFullScreen />
        : <video controls preload="metadata" src={api.media(v.url)} />}
    </div>
  );

  const renderImages = (f) => (f.images || []).length > 0 && (
    <div className="hs-figs">
      {f.images.map((im, i) => (
        <figure className="hs-fig" key={i}>
          <img src={api.media(im.src)} alt={pick(im.caption) || ''} loading="lazy" title={L.zoomHint}
            onClick={() => setZoom({ src: api.media(im.src), caption: pick(im.caption) })} />
          {pick(im.caption) && <figcaption>{pick(im.caption)}</figcaption>}
        </figure>
      ))}
    </div>
  );

  const renderFaq = (f) => f && (
    <>
      <div className="hs-q">{pick(f.question)}</div>
      <p>{pick(f.answer)}</p>
      {f.steps && pick(f.steps).length > 0 && (
        <>
          <div className="hs-label">{L.steps}</div>
          <ol className="hs-steps">{pick(f.steps).map((s, i) => <li key={i}>{s}</li>)}</ol>
        </>
      )}
      {renderImages(f)}
      {f.tips && pick(f.tips).length > 0 && (
        <div className="hs-tips"><b>💡 {L.tips}:</b> {pick(f.tips).join(' ')}</div>
      )}
      {renderVideo(f.video)}
      {f.action === 'errorPrompt' && (
        <div className="hs-chips">
          <div className="hs-label">{L.commonCodes}</div>
          {COMMON_CODES.map((c) => <button key={c} className="hs-chip" disabled={ended} onClick={() => sendText(c)}>{c}</button>)}
        </div>
      )}
    </>
  );

  const renderError = (e) => (
    <div className="hs-err" key={e.code}>
      <div className="hs-err-head">
        <span className="hs-code">{e.code}</span>
        <span className={`hs-badge hs-owner-${e.owner}`}>{pick(e.categoryLabel)}</span>
      </div>
      <div className="hs-err-desc"><span className="hs-label">{L.desc}</span>{e.description}</div>
      {e.alsoReportedAs?.length > 0 && <div className="hs-also">{L.alsoAs}: {e.alsoReportedAs.join(' | ')}</div>}
      <div className="hs-label">{L.meaning}</div>
      <p>{pick(e.meaning)}</p>
      <div className="hs-label">{L.whatToDo}</div>
      <ol className="hs-steps">{pick(e.steps).map((s, i) => <li key={i}>{s}</li>)}</ol>
      <div className="hs-meta">
        <div><span className="hs-label">{L.whoFixes}</span>{L.owner[e.owner]}</div>
        <div><span className="hs-label">{L.retry}</span>{e.retry ? L.retryYes : L.retryNo}</div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="hs-menu">
      {(content?.categories || []).map((c) => (
        <button key={c.id} className="hs-menu-item" disabled={ended} onClick={() => pickCategory(c)}>
          <span className="hs-menu-icon">{c.icon}</span>{pick(c.title)}
        </button>
      ))}
      {aiEnabled && <button className="hs-menu-item hs-menu-ai" disabled={ended} onClick={startAi}><span className="hs-menu-icon"><NiaFace size={22} /></span>{L.askAi}</button>}
      <button className="hs-menu-item hs-menu-alt" disabled={ended} onClick={notListed}>{L.notInList}</button>
      <button className="hs-menu-item hs-menu-alt" disabled={ended} onClick={finishChat}>{L.finishChat}</button>
    </div>
  );

  const renderBot = (m) => {
    switch (m.kind) {
      case 'greet': {
        const name = user?.name ? ` ${user.name}` : '';
        const brand = content?.config?.brandName || '';
        return (
          <>
            <p><b>{greetingWord()}{name}! 👋 / Namaste 🙏</b></p>
            <p>Welcome to {brand} Help &amp; Support. / {brand} Help &amp; Support me aapka swagat hai.</p>
          </>
        );
      }
      case 'chooseLang':
        return (
          <>
            <p><b>Please choose your language / Kripya apni bhasha chunein</b></p>
            <div className="hs-actions">
              <button className="hs-btn hs-btn-primary" disabled={!!lang} onClick={() => chooseLang('hi')}>हिन्दी (Hinglish)</button>
              <button className="hs-btn hs-btn-primary" disabled={!!lang} onClick={() => chooseLang('en')}>English</button>
            </div>
          </>
        );
      case 'intro': return <p>{L.intro}</p>;
      case 'categories': return renderCategories();
      case 'questions': {
        const c = catById[m.catId];
        const list = (content?.faqs || []).filter((f) => f.category === m.catId);
        return (
          <>
            <p>{L.pickQuestion(pick(c?.title))}</p>
            <div className="hs-qlist">
              {list.map((f) => <button key={f.id} className="hs-qbtn" disabled={ended} onClick={() => pickFaq(f)}>{pick(f.question)}</button>)}
              <button className="hs-qbtn hs-qback" disabled={ended} onClick={backToMenu}>{L.backMenu}</button>
            </div>
          </>
        );
      }
      case 'faq': return renderFaq(faqById[m.faqId]);
      case 'videoList':
        return (
          <>
            <p>{L.pickVideo}</p>
            <div className="hs-qlist">
              {(content?.videos || []).map((v) => <button key={v.id} className="hs-qbtn hs-vbtn" disabled={ended} onClick={() => pickVideo(v)}>🎬 {pick(v.title)}</button>)}
              <button className="hs-qbtn hs-qback" disabled={ended} onClick={backToMenu}>{L.backMenu}</button>
            </div>
          </>
        );
      case 'video': {
        const v = videoById[m.videoId];
        return v ? (<><div className="hs-q">{pick(v.title)}</div>{pick(v.description) && <p>{pick(v.description)}</p>}{renderVideo(v)}</>) : null;
      }
      case 'errors':
        return (<><p>{m.fuzzy ? L.errFuzzy : L.errFound}</p>{m.codes.map(renderError)}</>);
      case 'followup':
        return (
          <>
            <p>{L.helpfulQ}</p>
            {m.done ? <div className="hs-done">{m.done === 'yes' ? L.yes : L.no}</div> : (
              <div className="hs-actions">
                <button className="hs-btn" disabled={ended} onClick={() => answerFollowup(m, true)}>{L.yes}</button>
                <button className="hs-btn" disabled={ended} onClick={() => answerFollowup(m, false)}>{L.no}</button>
              </div>
            )}
          </>
        );
      case 'glad': return <p>{L.glad}</p>;
      case 'suggest':
        return (
          <>
            <p>{L.suggestQ}</p>
            <div className="hs-qlist">
              {m.ids.map((id) => faqById[id] && <button key={id} className="hs-qbtn" disabled={ended} onClick={() => pickFaq(faqById[id])}>{pick(faqById[id].question)}</button>)}
              {aiEnabled && <button className="hs-qbtn hs-vbtn" disabled={ended} onClick={() => askAiThis(m.query)}>{L.askAiThis}</button>}
              <button className="hs-qbtn hs-qback" disabled={ended} onClick={() => { push({ from: 'user', kind: 'userText', text: { hi: 'Mera sawal alag hai', en: 'My question is different' } }); fallback(m.query, 'notFound'); }}>{L.notInList}</button>
            </div>
          </>
        );
      case 'aiIntro': return <p>{L.aiIntro}</p>;
      case 'aiAnswer':
        return (
          <>
            {!m.chat && <div className="hs-aibadge">✨ {L.aiBadge}</div>}
            <div className="hs-aitext">{m.text}</div>
            {m.faqIds.length > 0 && (
              <div className="hs-qlist"><div className="hs-label">{L.related}</div>
                {m.faqIds.map((id) => faqById[id] && <button key={id} className="hs-qbtn" disabled={ended} onClick={() => pickFaq(faqById[id])}>{pick(faqById[id].question)}</button>)}
              </div>
            )}
            {!m.chat && <div className="hs-warn">{m.general ? L.aiCaution : L.aiNote}</div>}
            {!m.chat && <div className="hs-actions"><button className="hs-btn" disabled={ended} onClick={() => openMailFlow(m.query)}>{L.mailSupport}</button></div>}
          </>
        );
      case 'aiOffer':
        return (
          <>
            <p>{m.query ? L.aiOffer : L.aiOfferEmpty}</p>
            <div className="hs-actions">
              <button className="hs-btn hs-btn-primary" disabled={ended} onClick={() => askAiThis(m.query)}>{L.askAiThis}</button>
              <button className="hs-btn" disabled={ended} onClick={() => openMailFlow(m.query)}>{L.mailSupport}</button>
            </div>
          </>
        );
      case 'aiErr': return <><p>{L.aiErr}</p>{m.detail && <p className="hs-aidetail">{m.detail}</p>}<MailBlock L={L} query="" email={supportEmail} /></>;
      case 'aiLimit': return <p>{L.aiLimit}</p>;
      case 'notFound': return <p>{L.notFound}</p>;
      case 'sorry': return <p>{L.sorry}</p>;
      case 'mail': return <MailBlock L={L} query={m.query} email={supportEmail} />;
      case 'thanks': return <p><b>{L.thanks}</b></p>;
      case 'serverErr': return <p>{L.serverErr}</p>;
      default: return null;
    }
  };

  const renderUser = (m) => {
    if (m.kind === 'userLang') return m.l === 'hi' ? 'हिन्दी (Hinglish)' : 'English';
    if (m.kind === 'userRaw') return m.raw;
    return pick(m.text);
  };

  /* ---------- screens ---------- */
  if (loadError) {
    return (
      <div className={`hs-root ${className}`}>
        <div className="hs-center">
          <p>{L.loadFail}</p>
          <button className="hs-btn hs-btn-primary" onClick={load}>{L.retryLoad}</button>
        </div>
      </div>
    );
  }
  if (!content) return <div className={`hs-root ${className}`}><div className="hs-center">{L.loading}</div></div>;

  const inputDisabled = !lang || ended;
  const placeholder = ended ? L.phEnded : !lang ? L.phLang : L.ph;
  const AI_KINDS = new Set(['aiIntro', 'aiAnswer', 'aiOffer', 'aiErr']);
  const wide = new Set(['mail', 'errors', 'faq', 'video', 'videoList', 'aiAnswer', 'aiOffer', 'aiErr']);

  return (
    <div className={`hs-root ${className}`}>
      <header className="hs-header">
        <div className="hs-avatar">🎧</div>
        <div className="hs-header-text">
          <div className="hs-title">{L.title}</div>
          <div className="hs-sub"><span className="hs-dot" />{L.subtitle}</div>
        </div>
        {lang && (
          <div className="hs-lang" role="group" aria-label="Language">
            <button className={lang === 'hi' ? 'on' : ''} onClick={() => setLang('hi')}>हिन्दी</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
        )}
      </header>

      <div className="hs-body" aria-live="polite">
        {msgs.map((m) => (
          <div key={m.id} className={`hs-row ${m.from}`}>
            {m.from === 'bot' && (AI_KINDS.has(m.kind) ? <div className="hs-bot-av hs-bot-ai"><NiaFace size={30} /></div> : <div className="hs-bot-av">🤖</div>)}
            <div className={`hs-bubble ${m.from} ${wide.has(m.kind) ? 'wide' : ''}`}>
              {m.from === 'bot' ? renderBot(m) : renderUser(m)}
            </div>
          </div>
        ))}
        {typing && (
          <div className="hs-row bot"><div className={'hs-bot-av' + (aiMode ? ' hs-bot-ai' : '')}>{aiMode ? <NiaFace size={30} /> : '🤖'}</div><div className="hs-bubble bot hs-typing"><i /><i /><i /></div></div>
        )}
        <div ref={bottomRef} />
      </div>

      {ended ? (
        <div className="hs-ended">
          <span>{L.endedBar}</span>
          <button className="hs-btn hs-btn-primary" onClick={start}>{L.newChat}</button>
        </div>
      ) : (
        <>
        {aiMode && (
          <div className="hs-aibar"><span><NiaFace size={20} /> {L.aiOn}</span><button type="button" onClick={exitAi}>{L.aiExit}</button></div>
        )}
        <form className="hs-input" onSubmit={(e) => { e.preventDefault(); sendText(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={placeholder} disabled={inputDisabled} maxLength={300} aria-label={placeholder} />
          <button type="submit" disabled={inputDisabled || !input.trim() || typing}>{L.send} ➤</button>
        </form>
        </>
      )}

      {zoom && (
        <div className="hs-lightbox" onClick={() => setZoom(null)} role="dialog" aria-modal="true">
          <button className="hs-lightbox-close" onClick={() => setZoom(null)} aria-label={L.close}>✕</button>
          <img src={zoom.src} alt={zoom.caption || ''} onClick={(e) => e.stopPropagation()} />
          {zoom.caption && <div className="hs-lightbox-cap">{zoom.caption}</div>}
        </div>
      )}
    </div>
  );
}
