// src/components/shared/__tests__/ErrorBoundary.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

function ProblemChild(): JSX.Element {
  throw new Error('Test crash in component');
}

function HealthyChild() {
  return <div>Healthy Space</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <HealthyChild />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Healthy Space')).toBeInTheDocument();
  });

  it('catches render errors and renders the restorative pause fallback UI', () => {
    // Suppress console.error during expected throw
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>,
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('A Moment of Quiet Pause')).toBeInTheDocument();
    expect(screen.getByText('Restore Presence')).toBeInTheDocument();

    spy.mockRestore();
  });
});
