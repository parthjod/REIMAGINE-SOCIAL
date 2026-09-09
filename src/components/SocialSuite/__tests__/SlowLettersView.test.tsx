// src/components/SocialSuite/__tests__/SlowLettersView.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlowLettersView } from '../SlowLettersView';
import { INITIAL_LETTERS } from '../../../data/mockLetters';

describe('SlowLettersView Component', () => {
  it('renders postbox header and available letters', () => {
    const handleSend = vi.fn();
    const handleOpen = vi.fn();

    render(
      <SlowLettersView
        letters={INITIAL_LETTERS}
        onSendLetter={handleSend}
        onOpenLetter={handleOpen}
      />,
    );

    expect(screen.getByText(/Slow Letters/i)).toBeInTheDocument();
    expect(screen.getByText(INITIAL_LETTERS[0]!.sender.name)).toBeInTheDocument();
  });

  it('allows composing an unhurried letter and sending with golden hour delivery', () => {
    const handleSend = vi.fn();
    const handleOpen = vi.fn();

    render(
      <SlowLettersView
        letters={INITIAL_LETTERS}
        onSendLetter={handleSend}
        onOpenLetter={handleOpen}
      />,
    );

    const composeBtn = screen.getByText(/Write A Slow Letter/i);
    fireEvent.click(composeBtn);

    const recipientInput = screen.getByPlaceholderText(/Name or handle/i);
    const bodyInput = screen.getByPlaceholderText(/Dear friend/i);
    const dispatchBtn = screen.getByText(/Seal with Golden Wax/i);

    fireEvent.change(recipientInput, { target: { value: 'Amara Vance' } });
    fireEvent.change(bodyInput, {
      target: { value: 'Thinking of the quiet library at twilight.' },
    });
    fireEvent.click(dispatchBtn);

    expect(handleSend).toHaveBeenCalledWith(
      'Amara Vance',
      expect.any(String),
      'Thinking of the quiet library at twilight.',
      expect.any(String),
    );
  });
});
