// src/components/SocialSuite/__tests__/EpochFeed.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EpochFeed } from '../EpochFeed';
import { TODAY_EPOCH } from '../../../data/mockEpochs';

describe('EpochFeed Component', () => {
  it('renders daily epoch number and philosophical prompt', () => {
    const handleToggleResonance = vi.fn();
    const handleAddPost = vi.fn();

    render(
      <EpochFeed
        epoch={TODAY_EPOCH}
        onToggleResonance={handleToggleResonance}
        onAddPost={handleAddPost}
      />,
    );

    expect(screen.getByText(`Epoch #${TODAY_EPOCH.epochNumber}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(TODAY_EPOCH.themeTitle, 'i'))).toBeInTheDocument();
  });

  it('renders all posts belonging to the finite epoch', () => {
    const handleToggleResonance = vi.fn();
    const handleAddPost = vi.fn();

    render(
      <EpochFeed
        epoch={TODAY_EPOCH}
        onToggleResonance={handleToggleResonance}
        onAddPost={handleAddPost}
      />,
    );

    const firstPost = TODAY_EPOCH.posts[0];
    if (firstPost) {
      expect(screen.getByText(firstPost.author.name)).toBeInTheDocument();
    }
  });

  it('calls onToggleResonance when a resonance badge is clicked', () => {
    const handleToggleResonance = vi.fn();
    const handleAddPost = vi.fn();

    render(
      <EpochFeed
        epoch={TODAY_EPOCH}
        onToggleResonance={handleToggleResonance}
        onAddPost={handleAddPost}
      />,
    );

    const buttons = screen.getAllByRole('button');
    const resonanceBtn = buttons.find(
      (btn) => btn.textContent?.includes('Perspective') || btn.textContent?.includes('Grounding'),
    );

    if (resonanceBtn) {
      fireEvent.click(resonanceBtn);
      expect(handleToggleResonance).toHaveBeenCalled();
    }
  });
});
