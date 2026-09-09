// src/components/SocialSuite/CampfireRoom.tsx
import { useState } from 'react';
import type { CampfireThought } from '../../types/social';
import { AMBIENT_SOUNDS } from '../../data/mockCampfire';
import { useTranslation } from 'react-i18next';

import { sanitizeText } from '../../lib/sanitize';

interface CampfireRoomProps {
  thoughts: CampfireThought[];
  onAddThought: (text: string, vibe: string) => void;
  activeSound: 'hearth' | 'rain' | 'twilight' | 'chimes' | null;
  soundVolume: number;
  onToggleSound: (mode: 'hearth' | 'rain' | 'twilight' | 'chimes') => void;
  onUpdateVolume: (vol: number) => void;
}

const VIBE_OPTIONS = ['Stillness', 'Warmth', 'Solitude', 'Gratitude', 'Monsoon Rain', 'Peace'];

export function CampfireRoom({
  thoughts,
  onAddThought,
  activeSound,
  soundVolume,
  onToggleSound,
  onUpdateVolume,
}: CampfireRoomProps) {
  const { t } = useTranslation();
  const [whisperText, setWhisperText] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('Stillness');

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const cleanWhisper = sanitizeText(whisperText, 140);
    if (!cleanWhisper) return;
    onAddThought(cleanWhisper, selectedVibe);
    setWhisperText('');
  }

  return (
    <div className="campfire-room-container" aria-label="Synchronous Campfire space">
      {/* Campfire Header */}
      <header className="campfire-header">
        <div className="campfire-live-indicator">
          <span className="live-pulsing-fire">🔥</span>
          <div className="live-text-col">
            <h3>The Synchronous Hearth</h3>
            <span className="live-count-sub">
              <strong>94</strong> {t('social.campfire.livePresence')}
            </span>
          </div>
        </div>

        {/* Ambient Soundscape Controller */}
        <div className="soundscape-control-bar">
          <div className="soundscape-modes">
            {AMBIENT_SOUNDS.map((snd) => {
              const isCurrent = activeSound === snd.id;
              return (
                <button
                  key={snd.id}
                  type="button"
                  className={`sound-chip ${isCurrent ? 'active' : ''}`}
                  onClick={() => onToggleSound(snd.id)}
                  title={snd.description}
                >
                  <span className="sound-icon">{snd.icon}</span>
                  <span className="sound-name">{snd.name}</span>
                  {isCurrent && <span className="sound-wave-anim">♩</span>}
                </button>
              );
            })}
          </div>

          {activeSound && (
            <div className="sound-volume-slider-box">
              <span className="vol-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={soundVolume}
                onChange={(e) => onUpdateVolume(parseFloat(e.target.value))}
                aria-label="Soundscape volume"
              />
            </div>
          )}
        </div>
      </header>

      {/* Atmospheric Center Hearth Scene */}
      <div className="campfire-hearth-stage">
        <div className="hearth-glow-radial" />

        {/* Floating thought orbs floating softly */}
        <div className="floating-sparks-layer" aria-live="polite">
          {thoughts.slice(0, 5).map((thought, idx) => (
            <div
              key={thought.id}
              className={`floating-spark-card spark-pos-${idx}`}
              style={{
                ['--spark-glow' as string]: thought.glowColor,
                animationDelay: `${idx * 0.7}s`,
              }}
            >
              <div className="spark-top">
                <span className="spark-author">{thought.author}</span>
                <span className="spark-location">({thought.location})</span>
                <span className="spark-vibe-pill">{thought.vibe}</span>
              </div>
              <p className="spark-body">"{thought.text}"</p>
              <span className="spark-time">{thought.timeAgo}</span>
            </div>
          ))}
        </div>

        {/* The Fire Visual */}
        <div className="campfire-central-flame">
          <div className="flame-core" />
          <div className="flame-particles" />
          <div className="ember-stones" />
          <span className="fire-prompt-tag">Presence over broadcasting</span>
        </div>
      </div>

      {/* Whisper Input Form */}
      <form className="campfire-whisper-box" onSubmit={handleSend}>
        <div className="whisper-input-row">
          <input
            type="text"
            className="whisper-text-input"
            placeholder={t('social.campfire.dropThoughtPlaceholder')}
            value={whisperText}
            onChange={(e) => setWhisperText(e.target.value)}
            maxLength={180}
          />
          <button type="submit" className="whisper-send-btn" disabled={!whisperText.trim()}>
            <span>✦</span>
            <span>{t('social.campfire.sendSpark')}</span>
          </button>
        </div>

        <div className="whisper-vibes-row">
          <span className="vibe-label">Resonance Mood:</span>
          {VIBE_OPTIONS.map((vibe) => (
            <button
              key={vibe}
              type="button"
              className={`vibe-chip ${selectedVibe === vibe ? 'selected' : ''}`}
              onClick={() => setSelectedVibe(vibe)}
            >
              {vibe}
            </button>
          ))}
        </div>
      </form>

      {/* Live Tapestry of Recent Sparks */}
      <div className="recent-sparks-stream">
        <h4>Recent Ephemeral Reflections</h4>
        <div className="sparks-grid">
          {thoughts.map((item) => (
            <div key={item.id} className="spark-grid-item">
              <div className="spark-grid-header">
                <span className="spark-grid-user">
                  {item.author} • {item.location}
                </span>
                <span className="spark-grid-tag">{item.vibe}</span>
              </div>
              <p className="spark-grid-text">"{item.text}"</p>
              <span className="spark-grid-time">{item.timeAgo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
