// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CinemaScroll } from './components/CinemaScroll/CinemaScroll';
import { SocialShell } from './components/SocialSuite/SocialShell';
import { SiteHeader } from './components/Nav/SiteHeader';
import { useTranslation } from 'react-i18next';

function ToolShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="tool-shell">
      <SiteHeader isToolPage={true} />
      <div className="tool-content">
        {children}
        <Link to="/" className="tool-back">{t('ui.backHome')}</Link>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
}
