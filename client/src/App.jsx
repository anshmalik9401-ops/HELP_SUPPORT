// DEMO SHELL ONLY - mimics the Nimbus panel so you can test locally.
// In the real panel, only the <HelpSupport /> component (folder src/HelpSupport) is needed.
// Admin "Add more" page: open  http://localhost:5173/#admin
import { useEffect, useState } from 'react';
import HelpSupport from './HelpSupport/HelpSupport.jsx';
import HelpSupportAdmin from './HelpSupport/HelpSupportAdmin.jsx';

const API = (import.meta.env.VITE_SUPPORT_API_BASE || '/api/support').replace(/\/+$/, '');

export default function App() {
  const [admin, setAdmin] = useState(() => window.location.hash === '#admin');
  useEffect(() => {
    const f = () => setAdmin(window.location.hash === '#admin');
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);

  return (
    <div className="demo-wrap">
      <header className="demo-top">
        <b>Nimbus</b><span>SMS &amp; RCS Panel</span>
      </header>
      <div className="demo-body">
        <aside className="demo-side">
          <a href="#" className="demo-item on" onClick={() => { window.location.hash = ''; }}>❓ Help &amp; Support</a>
        </aside>
        <main className="demo-main">
          <div className="demo-crumb">
            Home / Help &amp; Support{admin ? ' / Admin' : ''}
            <a href={admin ? '#' : '#admin'} className="demo-admin">{admin ? '← Back to chat' : '⚙ Admin (add more)'}</a>
          </div>
          <div className="demo-content">
            {admin ? <HelpSupportAdmin apiBase={API} /> : <HelpSupport apiBase={API} user={{ name: 'Demo User' }} />}
          </div>
        </main>
      </div>
      <style>{`
        html,body,#root{height:100%;margin:0}
        .demo-wrap{display:flex;flex-direction:column;height:100vh;font-family:system-ui,sans-serif;background:#eef2f8}
        .demo-top{background:linear-gradient(135deg,#265e9a,#3878c3);color:#fff;padding:12px 20px;display:flex;gap:12px;align-items:baseline}
        .demo-top b{font-size:20px}.demo-top span{opacity:.85;font-size:13px}
        .demo-body{flex:1;display:flex;min-height:0}
        .demo-side{width:200px;background:#e4ebf4;padding:12px 0;flex-shrink:0}
        .demo-item{display:block;padding:11px 20px;color:#265e9a;text-decoration:none;font-weight:600;font-size:14px}
        .demo-item.on{background:#fff;border-left:4px solid #26a4e5}
        .demo-main{flex:1;min-width:0;padding:16px;display:flex;flex-direction:column}
        .demo-crumb{font-size:13px;color:#667085;margin-bottom:10px;display:flex;justify-content:space-between}
        .demo-admin{color:#265e9a;text-decoration:none;font-weight:600}
        .demo-content{flex:1;min-height:0}
        @media (max-width:760px){.demo-side{display:none}}
      `}</style>
    </div>
  );
}
