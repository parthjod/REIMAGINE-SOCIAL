# Security Policy & Hardening 🔒

## Security Architecture Overview

**REIMAGINE SOCIAL** is engineered with a **zero-trust, 100% client-side privacy model**. Because the platform has no backend servers or databases, the primary threat model centers around client-side web vulnerabilities: Cross-Site Scripting (XSS), Prototype Pollution, and DOM injection.

---

## 🛡️ Security Defenses Implemented

### 1. Input Sanitization & XSS Mitigation
- All user-supplied inputs (reflection text, campfire sparks, slow letters, and intention tags) pass through `src/lib/sanitize.ts` before entering React state or `localStorage`.
- Dangerous tags (`<script>`, `<iframe>`, `<embed>`, `object`, `svg`), javascript/vbscript protocols, and inline event handlers (`onerror=`, `onload=`) are systematically stripped.
- Special HTML entities are escaped to ensure user strings can never be interpreted as executable HTML markup.

### 2. LocalStorage Sanitization & Prototype Pollution Protection
- The `safeJsonParse()` utility inspects deserialized data from `localStorage` to guarantee that malicious `__proto__`, `constructor`, or `prototype` injections cannot poison JavaScript runtime objects.
- Corrupted or modified storage values gracefully fall back to typed initial seed data.

### 3. HTTP Security Headers
The production deployment on Vercel (`vercel.json`) strictly enforces modern browser security headers:
- `Content-Security-Policy`: Restricts scripts, styles, and workers strictly to origin.
- `X-Content-Type-Options: nosniff`: Prevents MIME-sniffing attacks.
- `X-Frame-Options: DENY`: Blocks clickjacking by preventing iframe embedding.
- `X-XSS-Protection: 1; mode=block`: Activates legacy browser XSS filters.
- `Strict-Transport-Security`: Forces TLS encryption over active HTTPS.
- `Referrer-Policy: strict-origin-when-cross-origin`: Restricts referrer leakage.
- `Permissions-Policy`: Completely disables camera, microphone, and geolocation hardware access.

### 4. Zero Surveillance & Telemetry
- No user accounts, passwords, or authentication credentials are created or stored.
- Zero analytics scripts, tracking pixels, or third-party advertising SDKs are loaded.

---

## 📬 Reporting a Vulnerability

If you identify a security concern or potential vulnerability within this codebase, please submit an issue or contact the maintainers directly via GitHub. We treat all security inquiries with immediate priority.
