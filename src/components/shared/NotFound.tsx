// src/components/shared/NotFound.tsx
import { Link } from 'react-router-dom';
import { SiteHeader } from '../Nav/SiteHeader';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="tool-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader isToolPage={true} />
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '520px',
            background: 'rgba(5, 12, 20, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '48px 32px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🌌</div>
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#38bdf8',
              fontWeight: 600,
            }}
          >
            404 • Path Uncharted
          </span>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 400,
              color: '#ffffff',
              margin: '12px 0 16px',
            }}
          >
            A Quiet Horizon
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: '#94a3b8',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            The coordinates you sought do not exist in this epoch. Take a breath and return to the hearth.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/"
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #0284c7)',
                color: '#04080e',
                fontWeight: 600,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              {t('ui.backHome') || 'Return to Experience'}
            </Link>
            <Link
              to="/studio"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#e2e8f0',
                fontWeight: 500,
                fontSize: '14px',
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
            >
              Open Social Suite
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
