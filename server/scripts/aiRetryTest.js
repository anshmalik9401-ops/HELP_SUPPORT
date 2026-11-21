const assert = require('assert');

process.env.GEMINI_API_KEY = 'test-key';
process.env.GEMINI_BASE_URL = 'https://unit.test';
process.env.GEMINI_MODEL = 'gemini-3.8-flash';
process.env.GEMINI_FALLBACK_MODEL = 'gemini-3.6-flash';

const ai = require('../support/ai');
const originalFetch = global.fetch;
const request = [{ role: 'user', parts: [{ text: 'ping' }] }];

async function main() {
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    const ok = calls === 3;
    return {
      ok,
      status: ok ? 200 : 503,
      statusText: 'Service Unavailable',
      headers: { get: () => null },
      json: async () => ok
        ? { candidates: [{ content: { parts: [{ text: 'OK' }] } }] }
        : { error: { message: 'temporary capacity' } },
    };
  };

  assert.strictEqual(await ai.callGemini('test system', request), 'OK');
  assert.strictEqual(calls, 3, 'should retry twice after temporary 503s');

  calls = 0;
  const mixedErrorUrls = [];
  global.fetch = async (url) => {
    calls += 1;
    mixedErrorUrls.push(url);
    if (calls === 1 || calls === 3) {
      const error = new Error('aborted');
      error.name = 'AbortError';
      throw error;
    }
    if (calls === 2) {
      return {
        ok: false,
        status: 503,
        statusText: 'Service Unavailable',
        headers: { get: () => '0' },
        json: async () => ({ error: { message: 'temporary capacity' } }),
      };
    }
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: () => null },
      json: async () => ({ candidates: [{ content: { parts: [{ text: 'fallback after timeout' }] } }] }),
    };
  };

  assert.strictEqual(await ai.callGemini('test system', request), 'fallback after timeout');
  assert.strictEqual(calls, 4, 'should try fallback after mixed primary timeouts and 503s');
  assert(mixedErrorUrls[0].includes('gemini-3.8-flash'));
  assert(mixedErrorUrls[3].includes('gemini-3.6-flash'));

  assert.strictEqual(ai.model(), 'gemini-3.6-flash', 'should use the fallback model after it succeeds');

  calls = 0;
  global.fetch = async () => {
    calls += 1;
    return {
      ok: false,
      status: 503,
      statusText: 'Service Unavailable',
      headers: { get: () => '0' },
      json: async () => ({ error: { message: 'temporary capacity' } }),
    };
  };

  await assert.rejects(ai.callGemini('test system', request), /HTTP 503/);
  assert.strictEqual(calls, 3, 'should stop after the initial request and two retries on the active model');

  calls = 0;
  global.fetch = async () => {
    calls += 1;
    if (calls === 1) {
      const error = new Error('aborted');
      error.name = 'AbortError';
      throw error;
    }
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: { get: () => null },
      json: async () => ({ candidates: [{ content: { parts: [{ text: 'OK' }] } }] }),
    };
  };

  assert.strictEqual(await ai.callGemini('test system', request), 'OK');
  assert.strictEqual(calls, 2, 'should retry a timeout once');
  console.log('AI retry tests passed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    global.fetch = originalFetch;
  });
