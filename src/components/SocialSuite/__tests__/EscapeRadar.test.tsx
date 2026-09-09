// src/components/SocialSuite/__tests__/EscapeRadar.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EscapeRadar } from '../EscapeRadar';

const mockStats = {
  doomscrollHoursSaved: 3.8,
  mindfulIntentionScore: 96,
  deepConnectionsFormed: 22,
  quietMinutesInPresence: 55,
  resonanceGiven: 18,
  epochsCompleted: 14,
};

describe('EscapeRadar Component', () => {
  it('renders all four digital freedom metric cards', () => {
    render(<EscapeRadar stats={mockStats} />);

    expect(screen.getByText('Digital Freedom Index')).toBeInTheDocument();
    expect(screen.getByText('3.8 hrs')).toBeInTheDocument();
    expect(screen.getByText('96%')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('55 min')).toBeInTheDocument();
  });

  it('renders the interactive Mind State Simulator', () => {
    render(<EscapeRadar stats={mockStats} />);

    expect(screen.getByText(/Mind State Simulator/i)).toBeInTheDocument();
    expect(screen.getByText('Extractive Casino')).toBeInTheDocument();
    expect(screen.getByText('Human Presence')).toBeInTheDocument();
  });
});
