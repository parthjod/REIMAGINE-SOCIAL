// src/components/shared/ErrorBoundary.tsx
import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#04080e',
            color: '#f8fafc',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '24px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              maxWidth: '480px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: '20px',
              padding: '36px 28px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕊️</div>
            <h1
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '24px',
                fontWeight: 600,
                color: '#38bdf8',
                marginBottom: '12px',
              }}
            >
              A Moment of Quiet Pause
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                lineHeight: 1.6,
                marginBottom: '24px',
              }}
            >
              An unexpected disturbance rippled through the stream. Your space and reflections are safe. Let us take a deep breath and return to stillness.
            </p>
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '12px 28px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'transform 0.15s ease, opacity 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Restore Presence
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
