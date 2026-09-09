// src/hooks/__tests__/useSocialState.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSocialState } from '../useSocialState';

describe('useSocialState Hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default epoch, campfire, and stats', () => {
    const { result } = renderHook(() => useSocialState());

    expect(result.current.activeTab).toBe('epoch');
    expect(result.current.epoch.posts.length).toBeGreaterThan(0);
    expect(result.current.campfireThoughts.length).toBeGreaterThan(0);
    expect(result.current.stats.doomscrollHoursSaved).toBeGreaterThan(0);
  });

  it('allows adding a new reflection post to epoch and increments stats', () => {
    const { result } = renderHook(() => useSocialState());

    act(() => {
      result.current.addPost(
        'A quiet moment by the window',
        'Deep Reflection',
        'Rain at dusk'
      );
    });

    expect(result.current.epoch.posts[0]!.text).toBe('A quiet moment by the window');
    expect(result.current.stats.deepConnectionsFormed).toBeGreaterThan(18);
  });

  it('toggles resonance on a post and updates metrics', () => {
    const { result } = renderHook(() => useSocialState());
    const postId = result.current.epoch.posts[0]!.id;

    act(() => {
      result.current.toggleResonance(postId, 'perspective');
    });

    const targetPost = result.current.epoch.posts.find((p) => p.id === postId);
    expect(targetPost?.userResonances).toContain('perspective');
  });

  it('allows sending a slow letter and updates letters list', () => {
    const { result } = renderHook(() => useSocialState());

    act(() => {
      result.current.sendLetter(
        'Elena Woods',
        'Quiet evening',
        'Reflecting on the stillness',
        'What brings you peace?'
      );
    });

    expect(result.current.letters[0]!.recipientName).toBe('Elena Woods');
  });
});
