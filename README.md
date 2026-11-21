# Nimbus Help & Support Q&A Chat (SMS + RCS panel)

Hinglish / English chat: greeting -> language -> topic menu -> answers with steps, screenshots, demo video -> free text / error code lookup -> mail fallback (support1@nimbusitsolutions.com) -> input disabled -> "New chat".
98 Q&A, 687 error codes (with solution), URL whitelist answer, 4 demo-video placeholders.

## Local run (2 terminals)
```
cd server && npm install && npm start      # http://localhost:5000
cd client && npm install && npm run dev    # http://localhost:5173
```
(Folder name me `&` na ho, warna Windows npm fail hota hai.)
Demo shell me left menu me sirf "Help & Support" hai. Admin page: `http://localhost:5173/#admin` (ya page ke upar "Admin (add more)" link).

## Render API + Vercel frontend
- Set Vercel's **Root Directory** to `client`, **Build Command** to `npm run build`, and **Output Directory** to `dist`.
- In Vercel project settings, add `VITE_SUPPORT_API_BASE=https://help-support-2.onrender.com/api/support` for Production (and Preview if needed), then redeploy.
- The default `/api/support` is for local development through the Vite proxy. Render serves the API and media; its current CORS preflight allows cross-origin requests.

## Senior ko panel me add karna ho to
1. **Backend:** `server/support/` folder + `server/public/media/` (screenshots/videos) copy karein. Express app me:
   ```js
   app.use('/api/support', require('./support/router'));
   ```
   `server/.env.example` ke variables apne .env me daalein (`ADMIN_KEY` zaroori hai admin page ke liye). Router `/api/support/media/...` se images/videos khud serve karta hai.
2. **Frontend:** `client/src/HelpSupport/` folder copy karein aur panel ke route/menu me lagayein:
   ```jsx
   import HelpSupport from './HelpSupport/HelpSupport.jsx';
   <HelpSupport apiBase="/api/support" user={{ name: loggedInUserName }} />
   ```
   Admin: `<HelpSupportAdmin apiBase="/api/support" />` (sirf admin/staff route par lagayein).
3. Theme colours `helpSupport.css` ke top ke variables me hain (panel blue/green).
4. Optional: `MONGO_URI` set karein to unanswered/feedback logs MongoDB me jayenge, warna `server/logs/*.jsonl`.

## Content kaise add / update karein ("add more")
- **Admin page se (recommended):** Q&A, Topics, Videos, Error codes add/edit; screenshots/mp4 upload; "Unanswered" tab me clients ke bina-jawab sawal se seedha Q&A bana sakte hain. Changes `server/support/data/custom.json` me save hote hain aur chat me turant live.
  - Shipped (seed) Q&A edit karoge to "Reset to original" se wapas ja sakte hain.
- **Code se:** `server/support/data/seed/*.js` (Q&A), `videos.json`, `errorCodes.json` (`npm run build:errors` se bana; hand-written solutions `server/scripts/errorKnowledge.js` me).
- **Demo videos replace karna:** abhi `server/public/media/videos/*.mp4` placeholder hain (dlt-mapping, sms-flow, rcs-template, rcs-campaign). Same naam ki real file rakh dein, ya Admin > Videos me upload / YouTube link do.

## Nia - Ask AI (Gemini)
- Put the key in `server/.env`: `GEMINI_API_KEY=...` (optional `GEMINI_MODEL`, default `gemini-3.8-flash`). The key stays on the server only; restart the server after changing it. Temporary model overloads and repeated timeouts retry, then try `gemini-3.6-flash` by default; if it works, Nia switches to it for the rest of the server run. Override the fallback with `GEMINI_FALLBACK_MODEL`.
- Admin page > **Ask AI** tab: switch the option ON/OFF (when OFF clients do not see it), add extra notes for the AI, and test the connection.
- The AI is called **Nia**. Scope: SMS, RCS, DLT, TRAI, error codes and this panel, plus greetings / small talk (greetings are answered instantly without calling Google). Any other topic is politely declined.
- On server start the terminal prints `[support] AI check: OK` or `AI check FAILED: <reason>` - read this first if Nia does not answer.
-  It answers from our Q&A + error-code knowledge first and for what is not covered it gives basic guidance from its general SMS / DLT / RCS knowledge, with a caution note telling the client to contact support1@nimbusitsolutions.com if the panel does not have the feature. Every AI answer has a "Mail support" button; "No" on the helpful question also opens the mail format. Error codes typed in AI mode are still answered directly from our table.
- Where clients see it: "Ask AI" button in the topic menu, and as an option when a typed question is not found / the answer did not help. AI is rate limited (20 questions / 10 min per client).
- Key types: "AIza..." keys (Google AI Studio) and "AQ...." keys (Vertex AI express mode) are both supported - the server picks the right Google endpoint from the key format.
- If Nia does not answer: Admin > Nia (AI) > **Test AI connection** shows the exact error (wrong key, model name, or the server cannot reach googleapis.com); also check the server terminal for `[support] AI failed:`. Restart the server after editing `.env`.
- Do not commit `.env` to a public repo.

## Test
`cd server && node scripts/selfTest.js` - content integrity + matcher checks.

## API (`/api/support`)
`GET /content`, `POST /ask`, `POST /ai`, `POST /feedback`, `GET /health`, `/admin/*` (header `x-admin-key`).
