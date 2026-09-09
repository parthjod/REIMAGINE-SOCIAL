// src/components/SocialSuite/CaughtUpModal.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CaughtUpModalProps {
  onClose: () => void;
}

export function CaughtUpModal({ onClose }: CaughtUpModalProps) {
  const { t } = useTranslation();
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Rest')[] = ['Inhale', 'Hold', 'Exhale', 'Rest'];
    let phaseIndex = 0;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          phaseIndex = (phaseIndex + 1) % phases.length;
          const next = phases[phaseIndex] ?? 'Inhale';
          setBreathPhase(next);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="caught-up-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Mindful Escape Portal"
    >
      <div className="caught-up-modal">
        <button
          type="button"
          className="modal-close-icon"
          onClick={onClose}
          aria-label="Return to stream"
        >
          ✕
        </button>

        <div className="caught-up-header">
          <div className="escape-portal-badge">
            <span className="badge-spark">✦</span>
            <span>ESCAPE Horizon Reached</span>
          </div>
          <h2>{t('social.epoch.caughtUpBanner')}</h2>
          <p className="caught-up-subline">{t('social.epoch.caughtUpSub')}</p>
        </div>

        {/* Mindful Breathing Sphere */}
        <div className="breathing-station">
          <div className={`breath-circle ${breathPhase.toLowerCase()}`}>
            <div className="breath-pulse-ring" />
            <div className="breath-content">
              <span className="breath-phase-text">{breathPhase}</span>
              <span className="breath-timer">{countdown}s</span>
            </div>
          </div>
          <span className="breathing-caption">Box Breathing • 4-4-4-4 Nervous System Reset</span>
        </div>

        {/* Real World Grounding Cards */}
        <div className="grounding-suggestions">
          <div className="grounding-item">
            <span className="grounding-icon">🪟</span>
            <div className="grounding-text">
              <strong>Look Away From Glass</strong>
              <p>Find the farthest object out your nearest window. Let your eye muscles soften.</p>
            </div>
          </div>
          <div className="grounding-item">
            <span className="grounding-icon">☕</span>
            <div className="grounding-text">
              <strong>Sensory Anchor</strong>
              <p>
                Drink a glass of water slowly or feel the temperature of the air on your wrists.
              </p>
            </div>
          </div>
          <div className="grounding-item">
            <span className="grounding-icon">🚶</span>
            <div className="grounding-text">
              <strong>Step Outside</strong>
              <p>
                The screen has served its purpose. Real presence is waiting beyond your doorstep.
              </p>
            </div>
          </div>
        </div>

        <div className="caught-up-actions">
          <button type="button" className="close-caught-up-btn" onClick={onClose}>
            I Feel Grounded • Return To Studio
          </button>
        </div>
      </div>
    </div>
  );
}
