const assert = require('assert');

process.env.GEMINI_API_KEY = 'test-gemini-key';
process.env.GEMINI_BASE_URL = 'https://unit.test';
process.env.GEMINI_MODEL = 'gemini-test';
process.env.OPENROUTER_API_KEY = 'test-openrouter-key';
process.env.OPENROUTER_MODEL = 'openai/gpt-4o';
process.env.PANEL_URL = 'https://panel.test/';
process.env.BRAND_NAME = 'Test Support';

const ai = require('../support/ai');
const originalFetch = global.fetch;
const contents = [
  { role: 'user', parts: [{ text: 'Previous question' }] },
  { role: 'model', parts: [{ text: 'Previous answer' }] },
  { role: 'user', parts: [{ text: 'Current question' }] },
];

async function main() {
  let calls = 0;
  global.fetch = async (url, options) => {
    calls += 1;
    if (url === 'https://unit.test/models/gemini-test:generateContent') {
      return {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        headers: { get: () => null },
        json: async () => ({ error: { message: 'Invalid Gemini test key' } }),
      };
    }

    assert.strictEqual(url, 'https://openrouter.ai/api/v1/chat/completions');
    assert.strictEqual(options.headers.Authorization, 'Bearer test-openrouter-key');
    assert.strictEqual(options.headers['HTTP-Referer'], 'https://panel.test/');
    assert.strictEqual(options.headers['X-Title'], 'Test Support');
    const body = JSON.parse(options.body);
    assert.strictEqual(body.model, 'openai/gpt-4o');
    assert.deepStrictEqual(body.messages, [
      { role: 'system', content: 'Test prompt' },
      { role: 'user', content: 'Previous question' },
      { role: 'assistant', content: 'Previous answer' },
      { role: 'user', content: 'Current question' },
    ]);
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ choices: [{ message: { content: '[[SOURCE:KB]]Answer from fallback' } }] }),
    };
  };

  assert.strictEqual(await ai.callAI('Test prompt', contents), '[[SOURCE:KB]]Answer from fallback');
  assert.strictEqual(calls, 2, 'Gemini failure falls back to OpenRouter');
  assert.strictEqual(ai.provider(), 'OpenRouter');

  calls = 0;
  global.fetch = async (url) => {
    calls += 1;
    if (url === 'https://unit.test/models/gemini-test:generateContent') {
      return {
        ok: false,
        status: 429,
        statusText: 'Too Many Requests',
        headers: { get: () => null },
        json: async () => ({ error: { status: 'RESOURCE_EXHAUSTED', message: 'Daily quota exceeded' } }),
      };
    }
    assert.strictEqual(url, 'https://openrouter.ai/api/v1/chat/completions');
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ choices: [{ message: { content: '[[SOURCE:KB]]Answer from OpenRouter' } }] }),
    };
  };
  assert.strictEqual(await ai.callAI('Test prompt', contents), '[[SOURCE:KB]]Answer from OpenRouter');
  assert.strictEqual(calls, 2, 'Gemini quota errors should immediately use OpenRouter');

  process.env.GEMINI_API_KEY = '';
  calls = 0;
  global.fetch = async (url, options) => {
    calls += 1;
    assert.strictEqual(url, 'https://openrouter.ai/api/v1/chat/completions');
    const body = JSON.parse(options.body);
    assert(body.messages[0].content.includes('You are Nia'));
    assert(body.messages[body.messages.length - 1].content.includes('How do I set up an SMS campaign?'));
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ choices: [{ message: { content: '[[SOURCE:KB]]OpenRouter primary' } }] }),
    };
  };
  assert.strictEqual(ai.isConfigured(), true);
  const result = await ai.ask('How do I set up an SMS campaign?', 'en');
  assert.strictEqual(result.type, 'ai');
  assert.strictEqual(result.text, 'OpenRouter primary');
  assert.strictEqual(calls, 1, 'OpenRouter works when Gemini is not configured');
  console.log('AI fallback tests passed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    global.fetch = originalFetch;
  });
