// src/components/Nav/SiteHeader.tsx
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface SiteHeaderProps {
  isToolPage?: boolean;
  onNavigateTab?: (
    tab: 'epoch' | 'campfire' | 'constellation' | 'letters' | 'radar' | 'manifesto',
  ) => void;
}

export function SiteHeader({ isToolPage = false, onNavigateTab }: SiteHeaderProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleNavToSocial(
    e: React.MouseEvent,
    tab?: 'epoch' | 'campfire' | 'constellation' | 'letters' | 'radar' | 'manifesto',
  ) {
    e.preventDefault();
    setMobileMenuOpen(false);
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
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <header className="site-header" aria-label="Primary navigation">
      <a
        className="site-logo"
        href="/"
        onClick={handleLogoClick}
        aria-label="REIMAGINE SOCIAL Home"
      >
        REIMAGINE SOCIAL
      </a>

      {/* Desktop Navigation */}
      <nav className={`site-nav ${mobileMenuOpen ? 'open' : ''}`} aria-label="Main menu">
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

      <div className="header-right-actions">
        <button
          type="button"
          className="header-cta-btn"
          onClick={(e) => handleNavToSocial(e, 'epoch')}
          aria-label="Enter REIMAGINE SOCIAL Studio"
        >
          ✦ Open Studio
        </button>

        <LanguageSwitcher />

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </div>
    </header>
  );
}
