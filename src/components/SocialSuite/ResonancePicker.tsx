// src/components/SocialSuite/ResonancePicker.tsx
import { RESONANCE_TYPES, type ResonanceType } from '../../types/social';
import { useTranslation } from 'react-i18next';

interface ResonancePickerProps {
  resonances: Record<ResonanceType, number>;
  userResonances: ResonanceType[];
  onToggle: (type: ResonanceType) => void;
}

export function ResonancePicker({
  resonances,
  userResonances,
  onToggle,
}: ResonancePickerProps) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';

  const types: ResonanceType[] = ['perspective', 'grounding', 'spark', 'humanity'];

  return (
    <div className="resonance-bar" aria-label="Human Resonance dimensions">
      {types.map((key) => {
        const info = RESONANCE_TYPES[key];
        const isActive = userResonances.includes(key);
        const count = resonances[key] || 0;

        return (
          <button
            key={key}
            type="button"
            className={`resonance-pill ${isActive ? 'active' : ''}`}
            style={{
              ['--accent-glow' as string]: info.color,
            }}
            onClick={() => onToggle(key)}
            title={info.description}
            aria-pressed={isActive}
          >
            <span className="resonance-icon" aria-hidden="true">
              {info.icon}
            </span>
            <span className="resonance-label">
              {isHindi ? info.hindiLabel : info.label}
            </span>
            <span className="resonance-count">
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
