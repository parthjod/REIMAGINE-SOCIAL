// src/components/SocialSuite/__tests__/CampfireRoom.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampfireRoom } from '../CampfireRoom';
import { INITIAL_CAMPFIRE_THOUGHTS } from '../../../data/mockCampfire';

describe('CampfireRoom Component', () => {
  it('renders synchronous presence indicator and thought sparks', () => {
    const handleAdd = vi.fn();
    const handleToggleSound = vi.fn();
    const handleUpdateVolume = vi.fn();

    render(
      <CampfireRoom
        thoughts={INITIAL_CAMPFIRE_THOUGHTS}
        onAddThought={handleAdd}
        activeSound={null}
        soundVolume={0.4}
        onToggleSound={handleToggleSound}
        onUpdateVolume={handleUpdateVolume}
      />,
    );

    expect(screen.getByText('The Synchronous Hearth')).toBeInTheDocument();
    expect(screen.getByText('94')).toBeInTheDocument();
    expect(
      screen.getAllByText(new RegExp(INITIAL_CAMPFIRE_THOUGHTS[0]!.author, 'i')).length,
    ).toBeGreaterThan(0);
  });

  it('allows user to whisper a new thought spark to the hearth', () => {
    const handleAdd = vi.fn();
    const handleToggleSound = vi.fn();
    const handleUpdateVolume = vi.fn();

    render(
      <CampfireRoom
        thoughts={INITIAL_CAMPFIRE_THOUGHTS}
        onAddThought={handleAdd}
        activeSound={null}
        soundVolume={0.4}
        onToggleSound={handleToggleSound}
        onUpdateVolume={handleUpdateVolume}
      />,
    );

    const input = screen.getByPlaceholderText(/Drop an ephemeral whisper into the hearth/i);
    const submitBtn = screen.getByText('Release Spark');

    fireEvent.change(input, { target: { value: 'A quiet ember in the evening' } });
    fireEvent.click(submitBtn);

    expect(handleAdd).toHaveBeenCalledWith('A quiet ember in the evening', expect.any(String));
  });

  it('toggles ambient soundscape modes when sound chips are clicked', () => {
    const handleAdd = vi.fn();
    const handleToggleSound = vi.fn();
    const handleUpdateVolume = vi.fn();

    render(
      <CampfireRoom
        thoughts={INITIAL_CAMPFIRE_THOUGHTS}
        onAddThought={handleAdd}
        activeSound={null}
        soundVolume={0.4}
        onToggleSound={handleToggleSound}
        onUpdateVolume={handleUpdateVolume}
      />,
    );

    const cedarBtn = screen.getByText('Cedar Fireplace');
    fireEvent.click(cedarBtn);

    expect(handleToggleSound).toHaveBeenCalledWith('hearth');
  });
});
