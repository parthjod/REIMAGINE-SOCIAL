// src/components/shared/NoteButton.tsx
import { useTranslation } from 'react-i18next';

export function NoteButton() {
  const { t } = useTranslation();

  function handleClick() {
    const socialSuiteEl = document.getElementById('social-suite');
    if (socialSuiteEl) {
      window.scrollTo({ top: 3900, behavior: 'smooth' });
    } else {
      window.location.href = '/#social-suite';
    }
  }

  return (
    <button
      className="note-button"
      onClick={handleClick}
      type="button"
      aria-label="Open Social Suite"
    >
      <span aria-hidden="true">✦</span>
      <span>{t('panels.bazaar.button')}</span>
    </button>
  );
}
