# System Architecture & Technical Specifications 🏛️

## 1. High-Level Architecture Overview

**REIMAGINE SOCIAL** is engineered as a **100% client-side, zero-backend progressive web application (PWA)**. It provides a complete alternative to legacy social platforms without requiring databases, cloud runtimes, or surveillance infrastructure.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            REIMAGINE SOCIAL                                 │
│                     100% Client-Side Architecture                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼─────────────────────────────┐
        ▼                              ▼                             ▼
 ┌──────────────┐             ┌──────────────────┐           ┌──────────────┐
 │ Presentation │             │ Procedural Audio │           │ State & Data │
 │ (React 18 +  │             │ (Web Audio API   │           │ (LocalStorage│
 │ TypeScript)  │             │ DSP Synthesis)   │           │ Persistence) │
 └──────────────┘             └──────────────────┘           └──────────────┘
        │                              │                             │
        ├─ CinemaScroll Parallax       ├─ Cedar Fireplace            ├─ Daily Epochs
        ├─ 6 Social Suite Modules      ├─ Rain on Moss               ├─ Slow Letters
        ├─ Interactive Canvas Graph    ├─ Twilight Waves             ├─ Campfire Sparks
        ├─ Responsive Modals & HUD     └─ Temple Chimes              └─ Escape Radar
        ├─ ErrorBoundary & 404 Route                                    Analytics
        └─ Bilingual i18n (EN / HI)
```

---

## 2. Core Architectural Components

### 2.1 The CinemaScroll Parallax Engine
- **Implementation**: `src/components/CinemaScroll/` & `src/hooks/useScrollProgress.ts`
- **Physics**: 7 independent visual planes composed of modern WebP scene assets.
- **Performance**: Driven by `requestAnimationFrame` with smoothstep Hermite interpolation:
  $$S(t) = 3t^2 - 2t^3$$
  eliminating frame drops and maintaining consistent 60fps rendering without expensive scroll event listeners.
- **Mouse Inertia**: `useMouseParallax.ts` listens for pointer movements and injects smooth CSS custom properties (`--mx`, `--my`) with dampening.

### 2.2 The 6 Reimagined Interactive Modules
1. **The Finite Daily Epoch (`EpochFeed.tsx`)**:
   - Replaces infinite scroll with a bounded collection of 6 daily reflections anchored to a philosophical inquiry.
   - 4-Dimensional qualitative resonance voting: *Perspective Shift*, *Grounding Calm*, *Creative Spark*, and *Shared Humanity*.
   - Circadian completion milestone triggers box-breathing guidance.
2. **The Synchronous Campfire (`CampfireRoom.tsx`)**:
   - Real-time co-presence without vanity follower counts.
   - Ephemeral thought sparks that dissipate naturally without permanent archive.
3. **Procedural Soundscape Synthesizer (`src/lib/ambientAudio.ts`)**:
   - Pure client-side DSP using browser-native Web Audio nodes: `AudioContext`, `BiquadFilterNode`, `GainNode`, and procedural noise buffers.
   - 0 bytes of audio network payloads.
4. **Constellations Spatial Human Map (`ConstellationGraph.tsx`)**:
   - 2D celestial network rendering kindred thinkers clustered by shared curiosities.
   - SVG vector links with dynamic distance-based alpha and interactive hover/focus focus rings.
5. **Slow Letters (`SlowLettersView.tsx`)**:
   - Epistolary correspondence delivered only at Dawn (06:00) or Dusk (18:30).
   - Interactive wax seal unsealing animation with customizable seal pigments.
6. **The Escape Radar (`EscapeRadar.tsx`)**:
   - Quantified digital liberation metrics: doomscroll hours reclaimed, deliberate reading ratio, and quiet presence time.
   - Dynamic Mind State Simulator contrasting the *Algorithmic Casino* with *Human Presence*.

---

## 3. Data Persistence & Sanitization Pipeline

```
[ User Input (Text / Intention / Wax Color) ]
                   │
                   ▼
       [ src/lib/sanitize.ts ]
       ├─ Strip dangerous HTML tags & scripts
       ├─ Escape dangerous entity characters
       └─ Enforce max character lengths
                   │
                   ▼
     [ src/hooks/useSocialState.ts ]
       ├─ Update in-memory React state
       └─ Safe JSON serialize to localStorage
                   │
                   ▼
         [ Browser localStorage ]
```

- **Protection Against XSS**: All strings passed to post creation, letter dispatch, and campfire sparks are sanitized with `sanitizeText()`.
- **Prototype Pollution Prevention**: `safeJsonParse()` explicitly inspects and discards object prototypes before state hydration.

---

## 4. Responsive Viewport Strategy

- **Fluid Breakpoints**:
  - `Desktop Wide`: >= 1024px (full dual-column comparisons, expanded canvas).
  - `Tablet`: 769px - 1023px (stacked stats, touch-friendly tab bar).
  - `Mobile Standard`: 481px - 768px (drawer menu, single-column matrix, full-width modals).
  - `Mobile Compact`: <= 480px (condensed typography, compact radar metrics, 44px minimum touch targets).
- **Height Clamping**: Bounded container prevents vertical clipping across 1366x768 laptops while unlocking full viewport height on mobile devices.

---

## 5. Security & Privacy Model

- **No Cookies**: Zero HTTP session cookies or tracking tokens.
- **Zero Third-Party Trackers**: No Google Analytics, Meta Pixels, or telemetry SDKs.
- **Content Security Policy (CSP)**: Strict headers configured in `vercel.json` restricting executable script origin to `'self'`.
