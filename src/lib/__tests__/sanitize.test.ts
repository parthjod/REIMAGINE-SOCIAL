// src/lib/__tests__/sanitize.test.ts
import { describe, it, expect } from 'vitest';
import { stripDangerousMarkup, escapeHtml, sanitizeText, safeJsonParse } from '../sanitize';

describe('Sanitization & Security Utilities', () => {
  it('strips script tags and malicious event handlers from user text', () => {
    const malicious =
      'Hello <script>alert("pwned")</script> World <img src="x" onerror="alert(1)">';
    const cleaned = stripDangerousMarkup(malicious);
    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('onerror=');
    expect(cleaned).toContain('Hello');
    expect(cleaned).toContain('World');
  });

  it('escapes dangerous HTML characters', () => {
    const raw = '<b>"Quiet" & \'Still\'</b>';
    const escaped = escapeHtml(raw);
    expect(escaped).toBe('&lt;b&gt;&quot;Quiet&quot; &amp; &#x27;Still&#x27;&lt;&#x2F;b&gt;');
  });

  it('sanitizes text, trims whitespace, and limits length', () => {
    const input = '   A mindful reflection for the hearth   ';
    const result = sanitizeText(input, 20);
    expect(result).toBe('A mindful reflection');
  });

  it('safely parses valid JSON from localStorage', () => {
    const stored = JSON.stringify({ count: 42 });
    const parsed = safeJsonParse(stored, { count: 0 });
    expect(parsed.count).toBe(42);
  });

  it('returns fallback on invalid JSON or corrupted payload', () => {
    const corrupted = 'not valid json {{{';
    const fallback = { safe: true };
    const parsed = safeJsonParse(corrupted, fallback);
    expect(parsed).toEqual(fallback);
  });

  it('blocks prototype pollution payloads in JSON strings', () => {
    const maliciousPayload = '{"__proto__": {"admin": true}}';
    const fallback = { safe: true };
    const parsed = safeJsonParse(maliciousPayload, fallback);
    expect(parsed).toEqual(fallback);
  });

  it('validates parsed structure against schema validator function', () => {
    const payload = JSON.stringify({ wrongField: true });
    const fallback = { posts: [] };
    const parsed = safeJsonParse(payload, fallback, (val) =>
      Boolean(val && typeof val === 'object' && 'posts' in val),
    );
    expect(parsed).toEqual(fallback);
  });
});
