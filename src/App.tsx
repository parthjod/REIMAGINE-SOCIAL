// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { SiteHeader } from './components/Nav/SiteHeader';
import { ErrorBoundary } from './components/shared/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const CinemaScroll = lazy(() =>
  import('./components/CinemaScroll/CinemaScroll').then((m) => ({ default: m.CinemaScroll }))
);
const SocialShell = lazy(() =>
  import('./components/SocialSuite/SocialShell').then((m) => ({ default: m.SocialShell }))
);
const NotFound = lazy(() =>
  import('./components/shared/NotFound').then((m) => ({ default: m.NotFound }))
);

function PageLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#04080e',
        color: '#38bdf8',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '2px solid rgba(56, 189, 248, 0.2)',
            borderTopColor: '#38bdf8',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.8 }}>
          Entering Calm Space...
        </p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function ToolShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="tool-shell">
      <SiteHeader isToolPage={true} />
      <div className="tool-content">
        {children}
        <Link to="/" className="tool-back">
          ← {t('ui.backHome')}
        </Link>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<CinemaScroll />} />
            <Route
              path="/studio"
              element={
                <ToolShell>
                  <SocialShell />
                </ToolShell>
              }
            />
            <Route
              path="/epoch"
              element={
                <ToolShell>
                  <SocialShell initialTab="epoch" />
                </ToolShell>
              }
            />
            <Route
              path="/campfire"
              element={
                <ToolShell>
                  <SocialShell initialTab="campfire" />
                </ToolShell>
              }
            />
            <Route
              path="/constellation"
              element={
                <ToolShell>
                  <SocialShell initialTab="constellation" />
                </ToolShell>
              }
            />
            <Route
              path="/letters"
              element={
                <ToolShell>
                  <SocialShell initialTab="letters" />
                </ToolShell>
              }
            />
            <Route
              path="/radar"
              element={
                <ToolShell>
                  <SocialShell initialTab="radar" />
                </ToolShell>
              }
            />
            <Route
              path="/manifesto"
              element={
                <ToolShell>
                  <SocialShell initialTab="manifesto" />
                </ToolShell>
              }
            />
            {/* Catch-all 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
