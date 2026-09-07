// src/components/Nav/SiteHeader.tsx
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface SiteHeaderProps {
  isToolPage?: boolean;
  onNavigateTab?: (tab: 'epoch' | 'campfire' | 'constellation' | 'letters' | 'radar' | 'manifesto') => void;
}

export function SiteHeader({ isToolPage = false, onNavigateTab }: SiteHeaderProps) {
  const { t } = useTranslation();

  function handleNavToSocial(e: React.MouseEvent, tab?: 'epoch' | 'campfire' | 'constellation' | 'letters' | 'radar' | 'manifesto') {
    e.preventDefault();
    if (tab && onNavigateTab) {
      onNavigateTab(tab);
    }
    const target = document.getElementById('social-suite');
    if (target) {
      window.scrollTo({ top: 3900, behavior: 'smooth' });
    } else {
      window.location.href = '/#social-suite';
    }
  }

  function handleLogoClick(e: React.MouseEvent) {
    if (!isToolPage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="site-logo" href="/" onClick={handleLogoClick}>
        REIMAGINE SOCIAL
      </a>

      <nav className="site-nav" aria-label="Main menu">
        <a href="#epoch" onClick={(e) => handleNavToSocial(e, 'epoch')}>
          {t('social.nav.epoch')}
        </a>
        <a href="#campfire" onClick={(e) => handleNavToSocial(e, 'campfire')}>
          {t('social.nav.campfire')}
        </a>
        <a href="#constellation" onClick={(e) => handleNavToSocial(e, 'constellation')}>
          {t('social.nav.constellation')}
        </a>
        <a href="#letters" onClick={(e) => handleNavToSocial(e, 'letters')}>
          {t('social.nav.letters')}
        </a>
        <a href="#radar" onClick={(e) => handleNavToSocial(e, 'radar')}>
          {t('social.nav.radar')}
        </a>
        <a href="#manifesto" onClick={(e) => handleNavToSocial(e, 'manifesto')}>
          {t('social.nav.manifesto')}
        </a>
      </nav>

      <LanguageSwitcher />
    </header>
  );
}
