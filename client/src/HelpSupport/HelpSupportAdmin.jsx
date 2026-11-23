// "Add more" admin page: add / edit Q&A, topics, demo videos, error codes. Protected by ADMIN_KEY (server/.env).
import { useEffect, useState, useCallback } from 'react';
import './helpSupportAdmin.css';

const EMPTY_FAQ = { id: '', category: '', question: { en: '' }, answer: { en: '' }, steps: { en: '' }, tips: { en: '' }, keywords: '', images: [], video: null };
const EMPTY_VIDEO = { id: '', type: 'file', url: '', title: { en: '' }, description: { en: '' }, order: 100 };
const EMPTY_CAT = { id: '', icon: '📁', title: { en: '' }, order: 500 };
const EMPTY_ERR = { code: '', description: '', meaning: { en: '' }, steps: { en: '' }, owner: 'support', retry: false, label: '' };
const join = (a) => (Array.isArray(a) ? a.join('\n') : a || '');

export default function HelpSupportAdmin({ apiBase = '/api/support' }) {
  const base = apiBase + '/admin';
  const [key, setKey] = useState(() => { try { return sessionStorage.getItem('hs-admin-key') || ''; } catch { return ''; } });
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('faq');
  const [msg, setMsg] = useState(null);
  const [form, setForm] = useState(null);
  const [unanswered, setUnanswered] = useState([]);
  const [errQ, setErrQ] = useState('');
  const [errList, setErrList] = useState([]);
  const [ai, setAi] = useState(null);
  const [testing, setTesting] = useState(false);

  const call = useCallback(async (path, opts = {}, k = key) => {
    const r = await fetch(base + path, { ...opts, headers: { 'x-admin-key': k, ...(opts.json ? { 'Content-Type': 'application/json' } : {}), ...(opts.headers || {}) }, body: opts.json ? JSON.stringify(opts.json) : opts.body });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error || 'HTTP ' + r.status);
    return j;
  }, [base, key]);

  const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 4000); };
  const reload = useCallback(async () => { setData(await call('/data')); }, [call]);

  const login = async (e) => {
    e?.preventDefault();
    try { await call('/ping'); try { sessionStorage.setItem('hs-admin-key', key); } catch { /* ignore */ } setAuthed(true); await reload(); setMsg(null); }
    catch (err) { flash('bad', err.message); }
  };
  useEffect(() => { if (key) login(); /* auto-login if key remembered */ }, []); // eslint-disable-line
  useEffect(() => { if (authed && tab === 'unanswered') call('/unanswered').then(setUnanswered).catch(() => {}); }, [authed, tab]); // eslint-disable-line
  useEffect(() => { if (authed && tab === 'ai') call('/settings').then(setAi).catch((e) => flash('bad', e.message)); }, [authed, tab]); // eslint-disable-line
  useEffect(() => { if (authed && tab === 'errors') call('/errors?q=' + encodeURIComponent(errQ)).then(setErrList).catch(() => {}); }, [authed, tab, errQ]); // eslint-disable-line

  const save = async (path, body, after) => {
    try { await call(path, { method: 'PUT', json: body }); await reload(); setForm(null); flash('ok', 'Saved ✔ (live in chat immediately)'); after && after(); }
    catch (err) { flash('bad', err.message); }
  };
  const del = async (path, text) => {
    if (!window.confirm(text)) return;
    try { await call(path, { method: 'DELETE' }); await reload(); setForm(null); flash('ok', 'Done ✔'); } catch (err) { flash('bad', err.message); }
  };
  const upload = async (file) => {
    if (!file) return null;
    try { const r = await call('/upload?name=' + encodeURIComponent(file.name), { method: 'POST', body: file, headers: { 'Content-Type': 'application/octet-stream' } }); return r.url; }
    catch (err) { flash('bad', err.message); return null; }
  };

  if (!authed) {
    return (
      <div className="hsa-root"><form className="hsa-login" onSubmit={login}>
        <h2>🔐 Help &amp; Support - Admin</h2>
        <p>Enter the admin key (ADMIN_KEY from server/.env).</p>
        <input type="password" placeholder="Admin key" value={key} onChange={(e) => setKey(e.target.value)} autoFocus />
        <button className="hsa-btn hsa-primary" type="submit">Login</button>
        {msg && <div className={'hsa-msg ' + msg.type}>{msg.text}</div>}
      </form></div>
    );
  }
  if (!data) return <div className="hsa-root"><div className="hsa-login">Loading…</div></div>;

  const set = (path, v) => setForm((f) => { const n = JSON.parse(JSON.stringify(f)); let o = n; const p = path.split('.'); p.slice(0, -1).forEach((k) => { o = o[k]; }); o[p[p.length - 1]] = v; return n; });
  const textInput = (label, path, rows = 0, hint) => (
    <div className="hsa-field"><label>{label}{hint && <small> {hint}</small>}</label>
      {(() => {
        const value = path.split('.').reduce((o, k) => o[k], form);
        const props = { value: value.en || '', placeholder: 'English', onChange: (e) => set(path + '.en', e.target.value) };
        return rows ? <textarea rows={rows} {...props} /> : <input {...props} />;
      })()}</div>
  );
  const catName = (id) => { const c = data.categories.find((x) => x.id === id); return c ? c.title.en : id; };

  // ---------- forms
  const faqForm = () => {
    const f = form;
    return (
      <div className="hsa-card">
        <h3>{f._new ? 'New Q&A' : 'Edit Q&A'} {f.source && <span className={'hsa-tag ' + f.source}>{f.source}</span>}</h3>
        <div className="hsa-row">
          <div className="hsa-field"><label>ID (unique, e.g. my-new-question)</label><input value={f.id} disabled={!f._new} onChange={(e) => set('id', e.target.value)} /></div>
          <div className="hsa-field"><label>Topic</label>
            <select value={f.category} onChange={(e) => set('category', e.target.value)}><option value="">- select -</option>{data.categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.title.en}</option>)}</select></div>
        </div>
        {textInput('Question *', 'question')}
        {textInput('Answer *', 'answer', 3)}
        {textInput('Steps (one per line)', 'steps', 5)}
        {textInput('Tip (optional)', 'tips', 2)}
        <div className="hsa-field"><label>Keywords <small>(comma-separated words and phrases clients may use)</small></label>
          <textarea rows={2} value={join(f.keywords)} onChange={(e) => set('keywords', e.target.value)} /></div>
        <div className="hsa-field"><label>Screenshots</label>
          {(f.images || []).map((im, i) => (
            <div className="hsa-img" key={i}>
              {im.src && <img src={apiBase + im.src} alt="" />}
              <input placeholder="Caption (English)" value={im.caption?.en || ''} onChange={(e) => set(`images.${i}.caption`, { en: e.target.value })} />
              <button className="hsa-btn" onClick={() => set('images', f.images.filter((_, j) => j !== i))}>Remove</button>
            </div>
          ))}
          <label className="hsa-btn">＋ Upload screenshot<input type="file" accept="image/*" hidden onChange={async (e) => { const u = await upload(e.target.files[0]); if (u) set('images', [...(f.images || []), { src: u, caption: { en: '' } }]); e.target.value = ''; }} /></label>
        </div>
        <div className="hsa-field"><label>Demo video (optional)</label>
          <select value={f.video?.ref || ''} onChange={(e) => set('video', e.target.value ? { ref: e.target.value } : null)}>
            <option value="">- none -</option>{data.videos.map((v) => <option key={v.id} value={v.id}>{v.title.en}</option>)}</select></div>
        <div className="hsa-field"><label>After the answer</label>
          <select value={f.action || ''} onChange={(e) => set('action', e.target.value || null)}><option value="">normal</option><option value="errorPrompt">ask for Error Code</option><option value="videos">show video list</option></select></div>
        <div className="hsa-actions">
          <button className="hsa-btn hsa-primary" onClick={() => save('/faq/' + encodeURIComponent(f.id), f)}>Save</button>
          <button className="hsa-btn" onClick={() => setForm(null)}>Cancel</button>
          {!f._new && f.source === 'edited' && <button className="hsa-btn" onClick={() => del('/faq/' + f.id + '?reset=1', 'Reset this Q&A to its original content?')}>Reset to original</button>}
          {!f._new && <button className="hsa-btn hsa-danger" onClick={() => del('/faq/' + f.id, 'Delete this Q&A?')}>Delete</button>}
        </div>
      </div>
    );
  };

  const catForm = () => (
    <div className="hsa-card"><h3>{form._new ? 'New topic' : 'Edit topic'}</h3>
      <div className="hsa-row">
        <div className="hsa-field"><label>ID</label><input value={form.id} disabled={!form._new} onChange={(e) => set('id', e.target.value)} /></div>
        <div className="hsa-field"><label>Icon (emoji)</label><input value={form.icon} onChange={(e) => set('icon', e.target.value)} /></div>
        <div className="hsa-field"><label>Order</label><input type="number" value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
      </div>
      {textInput('Title *', 'title')}
      <div className="hsa-actions">
        <button className="hsa-btn hsa-primary" onClick={() => save('/category/' + encodeURIComponent(form.id), form)}>Save</button>
        <button className="hsa-btn" onClick={() => setForm(null)}>Cancel</button>
        {!form._new && <button className="hsa-btn hsa-danger" onClick={() => del('/category/' + form.id, 'Delete this topic? Its Q&A items will no longer appear in the menu.')}>Delete</button>}
      </div></div>
  );

  const videoForm = () => (
    <div className="hsa-card"><h3>{form._new ? 'New demo video' : 'Edit demo video'}</h3>
      <div className="hsa-row">
        <div className="hsa-field"><label>ID</label><input value={form.id} disabled={!form._new} onChange={(e) => set('id', e.target.value)} /></div>
        <div className="hsa-field"><label>Type</label><select value={form.type} onChange={(e) => set('type', e.target.value)}><option value="file">Video file (mp4)</option><option value="youtube">YouTube embed</option></select></div>
        <div className="hsa-field"><label>Order</label><input type="number" value={form.order} onChange={(e) => set('order', e.target.value)} /></div>
      </div>
      <div className="hsa-field"><label>{form.type === 'youtube' ? 'YouTube embed URL (https://www.youtube.com/embed/...)' : 'Video URL / path'}</label>
        <input value={form.url} onChange={(e) => set('url', e.target.value)} />
        {form.type === 'file' && <label className="hsa-btn">⬆ Upload mp4<input type="file" accept="video/mp4,video/webm" hidden onChange={async (e) => { const u = await upload(e.target.files[0]); if (u) set('url', u); e.target.value = ''; }} /></label>}
        {form.type === 'file' && <small>Tip: edit this video and upload a replacement file to replace its placeholder.</small>}</div>
      {textInput('Title *', 'title')}
      {textInput('Description', 'description', 2)}
      <div className="hsa-actions">
        <button className="hsa-btn hsa-primary" onClick={() => save('/video/' + encodeURIComponent(form.id), form)}>Save</button>
        <button className="hsa-btn" onClick={() => setForm(null)}>Cancel</button>
        {!form._new && <button className="hsa-btn hsa-danger" onClick={() => del('/video/' + form.id, 'Delete this video?')}>Delete</button>}
      </div></div>
  );

  const errForm = () => (
    <div className="hsa-card"><h3>{form._new ? 'New / override error code' : 'Edit error code ' + form.code}</h3>
      <div className="hsa-row">
        <div className="hsa-field"><label>Code</label><input value={form.code} disabled={!form._new} onChange={(e) => set('code', e.target.value)} /></div>
        <div className="hsa-field"><label>Fix owner</label><select value={form.owner} onChange={(e) => set('owner', e.target.value)}><option value="client">Client</option><option value="support">Support</option><option value="operator">Operator</option><option value="none">None</option></select></div>
        <div className="hsa-field"><label>Retry useful?</label><select value={form.retry ? '1' : ''} onChange={(e) => set('retry', !!e.target.value)}><option value="">No</option><option value="1">Yes</option></select></div>
      </div>
      <div className="hsa-field"><label>Operator description (English)</label><input value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
      <div className="hsa-field"><label>Category label (optional)</label><input value={form.label} onChange={(e) => set('label', e.target.value)} /></div>
      {textInput('Meaning *', 'meaning', 2)}
      {textInput('Steps (one per line)', 'steps', 5)}
      <div className="hsa-actions">
        <button className="hsa-btn hsa-primary" onClick={() => save('/error/' + encodeURIComponent(form.code), form)}>Save</button>
        <button className="hsa-btn" onClick={() => setForm(null)}>Cancel</button>
        {!form._new && <button className="hsa-btn" onClick={() => del('/error/' + form.code, 'Remove this admin edit and restore the original?')}>Reset my edit</button>}
      </div></div>
  );

  const saveAi = async (patch) => {
    try { setAi(await call('/settings', { method: 'PUT', json: patch })); flash('ok', 'Saved ✔'); } catch (err) { flash('bad', err.message); }
  };
  const testAi = async () => {
    setTesting(true);
    try { const r = await call('/ai-test', { method: 'POST' }); flash('ok', 'AI works ✔ (reply: ' + r.reply + ')'); } catch (err) { flash('bad', 'AI test failed: ' + err.message); }
    setTesting(false);
  };

  const tabs = [['faq', 'Q&A'], ['cats', 'Topics'], ['videos', 'Videos'], ['errors', 'Error codes'], ['unanswered', 'Unanswered'], ['ai', 'Nia (AI)']];
  return (
    <div className="hsa-root">
      <div className="hsa-head">
        <h2>⚙️ Help &amp; Support - Admin</h2>
        <button className="hsa-btn" onClick={() => { try { sessionStorage.removeItem('hs-admin-key'); } catch { /* ignore */ } setAuthed(false); setKey(''); }}>Logout</button>
      </div>
      {data.readOnly && <div className="hsa-msg bad" role="status">Admin edits are disabled on Vercel (read-only filesystem). Edit the seed files in server/support/data/seed and redeploy, or use a persistent server.</div>}
      <div className="hsa-tabs">{tabs.map(([k, n]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setForm(null); }}>{n}</button>)}</div>
      {msg && <div className={'hsa-msg ' + msg.type}>{msg.text}</div>}

      {form ? ({ faq: faqForm, cats: catForm, videos: videoForm, errors: errForm, unanswered: faqForm }[tab])() : (
        <>
          {tab === 'faq' && (<>
            <div className="hsa-actions"><button className="hsa-btn hsa-primary" onClick={() => setForm({ ...EMPTY_FAQ, _new: true })}>＋ Add Q&amp;A</button><span className="hsa-count">{data.faqs.length} Q&amp;A</span></div>
            <table className="hsa-table"><thead><tr><th>Question</th><th>Topic</th><th>Source</th><th /></tr></thead><tbody>
              {data.faqs.map((f) => (<tr key={f.id}><td>{f.question.en}</td><td>{catName(f.category)}</td><td><span className={'hsa-tag ' + f.source}>{f.source}</span></td>
                <td><button className="hsa-btn" onClick={() => setForm({ ...f, steps: { en: join(f.steps.en) }, tips: { en: join(f.tips.en) }, keywords: join(f.keywords), images: f.images || [] })}>Edit</button></td></tr>))}
            </tbody></table></>)}
          {tab === 'cats' && (<>
            <div className="hsa-actions"><button className="hsa-btn hsa-primary" onClick={() => setForm({ ...EMPTY_CAT, _new: true })}>＋ Add topic</button></div>
            <table className="hsa-table"><tbody>{data.categories.map((c) => (<tr key={c.id}><td>{c.icon} {c.title.en}</td><td><span className={'hsa-tag ' + c.source}>{c.source}</span></td><td><button className="hsa-btn" onClick={() => setForm({ ...c })}>Edit</button></td></tr>))}</tbody></table></>)}
          {tab === 'videos' && (<>
            <div className="hsa-actions"><button className="hsa-btn hsa-primary" onClick={() => setForm({ ...EMPTY_VIDEO, _new: true })}>＋ Add video</button></div>
            <table className="hsa-table"><tbody>{data.videos.map((v) => (<tr key={v.id}><td>🎬 {v.title.en}</td><td><code>{v.url}</code></td><td><span className={'hsa-tag ' + v.source}>{v.source}</span></td><td><button className="hsa-btn" onClick={() => setForm({ ...v, description: v.description || { en: '' } })}>Edit</button></td></tr>))}</tbody></table></>)}
          {tab === 'errors' && (<>
            <div className="hsa-actions"><button className="hsa-btn hsa-primary" onClick={() => setForm({ ...EMPTY_ERR, _new: true })}>＋ Add / override code</button>
              <input className="hsa-search" placeholder={`Search code or text (${data.errorCount} codes)`} value={errQ} onChange={(e) => setErrQ(e.target.value)} /></div>
            <table className="hsa-table"><tbody>{errList.map((e) => (<tr key={e.code}><td><b>{e.code}</b></td><td>{e.description}</td><td>{e.source && <span className={'hsa-tag ' + e.source}>{e.source}</span>}</td>
              <td><button className="hsa-btn" onClick={() => setForm({ code: e.code, description: e.description, meaning: e.meaning || { en: '' }, steps: { en: join(e.steps?.en) }, owner: e.owner || 'support', retry: !!e.retry, label: e.categoryLabel?.en || '' })}>Edit</button></td></tr>))}</tbody></table></>)}
          {tab === 'ai' && (ai ? (
            <div className="hsa-card">
              <h3>Nia - AI assistant</h3>
              <p className="hsa-note">
                Gemini: {ai.geminiConfigured ? <b style={{ color: '#067647' }}>set</b> : <b style={{ color: '#b42318' }}>missing</b>}
                {' · '}OpenRouter: {ai.openRouterConfigured ? <b style={{ color: '#067647' }}>set</b> : <b style={{ color: '#b42318' }}>missing</b>}
                {!ai.configured && <span> - set GEMINI_API_KEY and/or OPENROUTER_API_KEY on the server</span>}
                {' · '}Models: <code>{ai.model}</code> / <code>{ai.openRouterModel}</code>
              </p>
              <label className="hsa-switch">
                <input type="checkbox" checked={ai.aiEnabled} disabled={!ai.configured} onChange={(e) => saveAi({ aiEnabled: e.target.checked })} />
                <span>{ai.aiEnabled ? 'Nia is ON - clients see the "Ask Nia" option' : 'Nia is OFF - the option is hidden for clients'}</span>
              </label>
              <div className="hsa-field"><label>Extra notes for the AI <small>(optional - facts, rules or answers the AI must follow; added to our Q&amp;A knowledge)</small></label>
                <textarea rows={6} value={ai.aiNotes} onChange={(e) => setAi({ ...ai, aiNotes: e.target.value })} /></div>
              <div className="hsa-actions">
                <button className="hsa-btn hsa-primary" onClick={() => saveAi({ aiNotes: ai.aiNotes })}>Save notes</button>
                <button className="hsa-btn" disabled={testing || !ai.configured} onClick={testAi}>{testing ? 'Testing…' : 'Test AI connection'}</button>
              </div>
              <p className="hsa-note">The AI answers from our Q&amp;A and error-code knowledge first, and uses its general SMS / DLT / RCS knowledge only for what is not covered.</p>
            </div>
          ) : <p>Loading…</p>)}
          {tab === 'unanswered' && (<>
            <p className="hsa-note">Questions that clients submitted without finding an answer. Add an answer with "Create Q&amp;A."</p>
            <table className="hsa-table"><tbody>{unanswered.length === 0 && <tr><td>No unanswered questions yet 🎉</td></tr>}
              {unanswered.map((u, i) => (<tr key={i}><td>{u.text}</td><td>{u.at ? new Date(u.at).toLocaleString() : ''}</td>
                <td><button className="hsa-btn" onClick={() => { setTab('faq'); setForm({ ...EMPTY_FAQ, _new: true, question: { en: u.text }, keywords: u.text }); }}>Create Q&amp;A</button></td></tr>))}</tbody></table></>)}
        </>
      )}
    </div>
  );
}
