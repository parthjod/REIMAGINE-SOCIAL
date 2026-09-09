// src/components/CinemaScroll/IntroCopy.tsx
import { useTranslation } from 'react-i18next';

export function IntroCopy() {
  const { t } = useTranslation();

  return (
    <section className="intro-copy" aria-label="REIMAGINE SOCIAL overview">
      <p>{t('hero.tagline')}</p>
      <div className="hero-tags" aria-label="REIMAGINE SOCIAL highlights">
        <span>{t('hero.tags.finiteEpochs')}</span>
        <span>{t('hero.tags.resonance')}</span>
        <span>{t('hero.tags.zeroAlgorithms')}</span>
        <span>{t('hero.tags.slowPresence')}</span>
      </div>

      <div className="hero-cta-group">
        <button
          type="button"
          className="hero-enter-btn"
          onClick={() => window.scrollTo({ top: 3900, behavior: 'smooth' })}
          aria-label="Enter Daily Epoch experience"
        >
          ✦ Enter Daily Epoch ✦
        </button>
      </div>
    </section>
  );
}
