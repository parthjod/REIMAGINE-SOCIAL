// src/components/shared/__tests__/NavigationAndPanels.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SiteHeader } from '../../Nav/SiteHeader';
import { IntroCopy } from '../../CinemaScroll/IntroCopy';
import { StoryPanel } from '../../CinemaScroll/StoryPanel';
import { NoteButton } from '../NoteButton';
import '../../../i18n';

describe('Navigation and CinemaScroll Panels', () => {
  it('renders SiteHeader with accessible logo, navigation links, and CTA', () => {
    const handleNavigate = vi.fn();
    render(
      <BrowserRouter>
        <SiteHeader onNavigateTab={handleNavigate} />
      </BrowserRouter>,
    );

    expect(screen.getByText('REIMAGINE SOCIAL')).toBeInTheDocument();
    expect(screen.getByText('✦ Open Studio')).toBeInTheDocument();

    const openStudioBtn = screen.getByText('✦ Open Studio');
    fireEvent.click(openStudioBtn);
    expect(handleNavigate).toHaveBeenCalledWith('epoch');
  });

  it('toggles mobile menu drawer when hamburger button is clicked', () => {
    render(
      <BrowserRouter>
        <SiteHeader />
      </BrowserRouter>,
    );

    const hamburger = screen.getByLabelText('Open menu');
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('renders IntroCopy with highlight badges and CTA button', () => {
    render(<IntroCopy />);

    expect(screen.getByText('✦ Enter Daily Epoch ✦')).toBeInTheDocument();
    const cta = screen.getByText('✦ Enter Daily Epoch ✦');
    fireEvent.click(cta);
    expect(window.scrollTo).toHaveBeenCalled();
  });

  it('renders StoryPanel with facts and optional note button', () => {
    const facts = [
      { dt: '3.5 hrs', dd: 'Saved time' },
      { dt: '0', dd: 'Algorithms' },
    ];

    render(
      <StoryPanel
        className="test-panel"
        ariaLabel="Test Panel"
        headingKey="panels.bridge.heading"
        bodyKey="panels.bridge.body"
        facts={facts}
        noteButton
      />,
    );

    expect(screen.getByText('3.5 hrs')).toBeInTheDocument();
    expect(screen.getByText('Saved time')).toBeInTheDocument();
    expect(screen.getByLabelText('Open Social Suite')).toBeInTheDocument();
  });

  it('triggers smooth scroll on NoteButton click', () => {
    render(<NoteButton />);
    const btn = screen.getByLabelText('Open Social Suite');
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
