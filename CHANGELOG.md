# Changelog

All notable changes to the **REIMAGINE SOCIAL** platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-09-09

### Added
- **Performance Engine**: Converted all hero raster image assets to modern WebP format, reducing asset transfer footprint from 33.8MB to 2.49MB (92.6% reduction).
- **Responsive Architecture**: Multi-breakpoint responsive layouts covering desktop, tablet, and mobile (1024px, 768px, 480px, 360px).
- **Mobile Navigation Drawer**: Accessible slide-out navigation with ARIA dialog semantics, keyboard navigation, and backdrop dismissal.
- **Security & Input Sanitization**: Client-side XSS prevention module (`stripDangerousMarkup`, `escapeHtml`, `sanitizeText`, prototype-safe `safeJsonParse`).
- **Comprehensive Automated Testing**: 7 Vitest test suites (23 tests, 100% pass) with coverage reporting via `@vitest/coverage-v8`.
- **System Resilience**: React ErrorBoundary with restorative calm fallback UI and 404 NotFound routing.
- **Community Standards**: Open source MIT License, CONTRIBUTING guide, ARCHITECTURE documentation, SECURITY policy, and CODE_OF_CONDUCT.

### Changed
- Refactored `index.html` with explicit CDN preconnect, font preload for `Ogg Medium`, and WebP image preloading.
- Configured Rollup `manualChunks` in `vite.config.ts` isolating `vendor-react` and `vendor-i18n` chunks.
- Updated `vercel.json` with immutable 1-year caching and comprehensive HTTP security headers.

## [0.1.0] - 2026-09-07

### Added
- Initial implementation of the ESCAPE challenge social platform.
- Cinematic parallax landing stage with 7 visual layers.
- 5 core restorative social modules: Daily Finite Epochs, Qualitative 4D Resonance, Synchronous Campfire with Web Audio DSP soundscapes, Constellation network map, and Golden-hour Slow Letters.
- Zero-backend client-side state machine using localStorage persistence.
- Offline-ready Progressive Web App (PWA) manifest and service worker.
