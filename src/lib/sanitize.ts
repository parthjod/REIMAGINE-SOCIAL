// src/lib/sanitize.ts
/**
 * Security and Data Sanitization Utility
 * Provides input sanitization, XSS prevention, and type-safe schema validation
 * for client-side state and user input.
 */

// HTML entity map for escaping untrusted characters
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

const DANGEROUS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript\s*:/gi,
  /data\s*:\s*text\/html/gi,
  /vbscript\s*:/gi,
  /on\w+\s*=/gi,
];

/**
 * Strips known dangerous HTML tags, malicious event handlers, and protocol injection.
 */
export function stripDangerousMarkup(raw: string): string {
  if (typeof raw !== 'string') return '';
  let cleaned = raw;
  for (const pattern of DANGEROUS_PATTERNS) {
    cleaned = cleaned.replace(pattern, '');
  }
  return cleaned;
}

/**
 * Escapes HTML entities to ensure user content can never be evaluated as executable code.
 */
export function escapeHtml(unsafe: string): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe.replace(/[&<>"'`=\/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
}

/**
 * Sanitizes arbitrary user input text for reflection posts, campfire sparks, and slow letters:
 * - Trims whitespace
 * - Removes non-printable control characters
 * - Strips dangerous markup
 * - Enforces length bounds
 */
export function sanitizeText(input: string, maxLength = 1000): string {
  if (typeof input !== 'string') return '';
  // Strip control characters except newline and tab
  const cleaned = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  const stripped = stripDangerousMarkup(cleaned);
  return stripped.trim().slice(0, maxLength);
}

/**
 * Validates and safely parses JSON from localStorage with fallback and prototype pollution protection.
 */
export function safeJsonParse<T>(raw: string | null, fallback: T, validator?: (parsed: unknown) => boolean): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    // Block Prototype Pollution by checking own properties
    if (parsed && typeof parsed === 'object') {
      const hasOwn = Object.prototype.hasOwnProperty;
      if (hasOwn.call(parsed, '__proto__') || hasOwn.call(parsed, 'prototype')) {
        return fallback;
      }
    }
    if (validator && !validator(parsed)) {
      return fallback;
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}
