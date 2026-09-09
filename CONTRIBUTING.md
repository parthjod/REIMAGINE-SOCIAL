# Contributing to REIMAGINE SOCIAL 🕊️

Thank you for your interest in contributing to **REIMAGINE SOCIAL**. Our platform exists to pioneer a new paradigm of digital interaction: restorative, finite, thoughtful, and human-first.

---

## 🧭 Core Architectural Principles

When building or refining features, ensure your contributions adhere to these four foundational rules:

1. **100% Client-Side Execution**: Zero external backend APIs, zero tracking cookies, zero surveillance scripts. All state resides safely within the user's browser sandbox (`localStorage`).
2. **Finite & Restorative Design**: Never introduce mechanics that foster compulsive engagement (no endless feeds, no notification loops, no vanity counts).
3. **Accessibility First**: Semantic HTML5 tags, full keyboard navigation (`Tab`, `Enter`, `Space`, `Escape`), high contrast ratios, and complete screen-reader compatibility (`aria-*`).
4. **TypeScript Strictness**: Strictly typed interfaces for all models and state; zero `any` types.

---

## 🛠️ Local Development Workflow

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/parthjod/reimagine-social.git
cd reimagine-social

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Visit `http://localhost:5173` to explore your changes with instant Hot Module Replacement (HMR).

### 4. Running Verification Checks
Prior to opening any pull request or pushing code, ensure all local validation commands succeed:
```bash
# Verify TypeScript compile & production bundle
npm run build

# Run ESLint linter
npm run lint

# Run Vitest test suite
npm test
```

---

## 📂 Project Structure

```
src/
├── components/
│   ├── CinemaScroll/        # 7-layer 60fps parallax experience
│   ├── Nav/                 # Responsive header & bilingual language switcher
│   ├── shared/              # Error boundaries, 404 handler, buttons
│   └── SocialSuite/         # The 6 reimagined interactive modules
├── hooks/                   # Custom state & viewport hooks
├── i18n/                    # English & Hindi translation catalogs
├── lib/                     # Procedural audio DSP, data sanitization
├── styles/                  # CSS modules, design tokens, responsive breakpoints
└── types/                   # TypeScript interfaces & domain entities
```

---

## 🤝 Code Style Guidelines

- **Component Organization**: Colocate components within feature folders; extract complex logic into custom hooks.
- **Input Sanitization**: Always pass user-generated content through `src/lib/sanitize.ts` before persisting to state.
- **Responsive Layouts**: Design mobile-first; test at 320px, 375px, 768px, 1024px, and 1440px viewports.
- **CSS Architecture**: Use CSS variables defined in `index.css` for consistent palettes and typography.

---

## 📜 Pull Request Guidelines

1. Create a descriptive feature branch: `git checkout -b feat/your-feature-name`
2. Commit with conventional commit messages: `feat: add soundscape preset` or `fix: responsive modal scroll`
3. Ensure all tests and lint checks pass cleanly.
4. Submit your pull request with a concise description of the change and its alignment with our human-first philosophy.
