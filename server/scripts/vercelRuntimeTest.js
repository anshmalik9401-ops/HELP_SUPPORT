const assert = require('assert');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

process.env.VERCEL = '1';
process.env.ADMIN_KEY = 'vercel-test-key';
process.env.GEMINI_API_KEY = 'vercel-test-key';
process.env.AI_ENABLED = 'true';
process.env.GEMINI_BASE_URL = 'https://unit.test';
process.env.OPENROUTER_API_KEY = '';
delete process.env.MONGO_URI;

const ai = require('../support/ai');
const originalIsEnabled = ai.isEnabled;
process.env.AI_ENABLED = 'false';
assert.strictEqual(ai.isEnabled(), false, 'AI_ENABLED=false should disable Nia');
process.env.AI_ENABLED = 'true';
ai.isEnabled = () => true;

const originalFetch = global.fetch;
global.fetch = async () => { throw new Error('Greeting should not call Gemini'); };

const app = express();
app.use(cors());
app.use('/api/support', require('../support/router'));

function request(server, method, route, body, headers = {}) {
  const payload = body == null ? null : Buffer.isBuffer(body) ? body : Buffer.from(JSON.stringify(body));
  const options = {
    hostname: '127.0.0.1',
    port: server.address().port,
    method,
    path: route,
    headers: {
      ...(payload && !Buffer.isBuffer(body) ? { 'content-type': 'application/json' } : {}),
      ...(payload ? { 'content-length': payload.length } : {}),
      ...headers,
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve({
        status: res.statusCode,
        headers: res.headers,
        body: Buffer.concat(chunks),
      }));
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function main() {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, '127.0.0.1', () => resolve(instance));
  });
  const logFile = path.join(__dirname, '../logs', `vercel-test-${process.pid}.jsonl`);

  try {
    const health = await request(server, 'GET', '/api/support/health');
    assert.deepStrictEqual(JSON.parse(health.body), { ok: true });

    const content = await request(server, 'GET', '/api/support/content');
    const data = JSON.parse(content.body);
    assert(data.categories.length > 0);
    assert(data.faqs.length > 0);

    const errorLookup = await request(server, 'POST', '/api/support/ask', { text: '497' });
    assert.strictEqual(JSON.parse(errorLookup.body).type, 'error');

    const greeting = await request(server, 'POST', '/api/support/ai', { text: 'hello', lang: 'en' });
    assert.strictEqual(JSON.parse(greeting.body).type, 'ai');
    assert.strictEqual(JSON.parse(greeting.body).chat, true);

    let quotaRequests = 0;
    global.fetch = async () => {
      quotaRequests += 1;
      return {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: { get: () => null },
        json: async () => ({ error: { status: 'RESOURCE_EXHAUSTED', message: 'Daily quota exceeded' } }),
      };
    };
    const quotaResponse = await request(server, 'POST', '/api/support/ai', { text: 'How do I send an SMS campaign?', lang: 'en' });
    const quotaBody = JSON.parse(quotaResponse.body);
    assert.strictEqual(quotaResponse.status, 503);
    assert.strictEqual(quotaBody.code, 'AI_QUOTA_EXCEEDED');
    assert.match(quotaBody.error, /usage limit/i);
    assert.strictEqual(quotaRequests, 1, 'the exhausted Gemini quota must not be retried');

    const image = await request(server, 'GET', '/api/support/media/img/sms-menu.png');
    assert.strictEqual(image.status, 200);
    assert.strictEqual(image.headers['content-type'], 'image/png');
    assert.deepStrictEqual(image.body.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));

    const adminHeaders = { 'x-admin-key': process.env.ADMIN_KEY };
    const adminData = await request(server, 'GET', '/api/support/admin/data', null, adminHeaders);
    assert.strictEqual(JSON.parse(adminData.body).readOnly, true);

    const readOnlyMessage = 'Admin edits are disabled on Vercel (read-only filesystem). Edit the seed files in server/support/data/seed and redeploy, or use a persistent server.';
    const faqEdit = await request(server, 'PUT', '/api/support/admin/faq/test', {}, adminHeaders);
    assert.strictEqual(faqEdit.status, 501);
    assert.strictEqual(JSON.parse(faqEdit.body).error, readOnlyMessage);

    const upload = await request(server, 'POST', '/api/support/admin/upload?name=test.png', Buffer.from('image'), {
      ...adminHeaders,
      'content-type': 'application/octet-stream',
    });
    assert.strictEqual(upload.status, 501);
    assert.strictEqual(JSON.parse(upload.body).error, readOnlyMessage);

    await require('../support/store').log({ type: `vercel-test-${process.pid}`, text: 'must not write' });
    assert.strictEqual(fs.existsSync(logFile), false, 'Vercel without MongoDB must not write file logs');
    await assert.rejects(
      async () => require('../support/content').writeCustom({}),
      new RegExp(readOnlyMessage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    );

    console.log('Vercel runtime checks passed: health, content, ask, greeting, quota handling, media, admin 501, no file writes');
  } finally {
    ai.isEnabled = originalIsEnabled;
    global.fetch = originalFetch;
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
