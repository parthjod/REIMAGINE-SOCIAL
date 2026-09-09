// src/components/CinemaScroll/CinemaScroll.tsx
import { useRef, useState } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { SiteHeader } from '../Nav/SiteHeader';
import { IntroCopy } from './IntroCopy';
import { StoryPanel } from './StoryPanel';
import { SocialShell } from '../SocialSuite/SocialShell';
import type { SocialTab } from '../../hooks/useSocialState';
import { useTranslation } from 'react-i18next';
import '../../styles/CinemaScroll.css';

const ASSETS = {
  sky: '/images/sky.webp',
  backGlow: '/images/backGlow.webp',
  cityMidBack: '/images/cityMidBack.webp',
  splitLeft: '/images/splitLeft.webp',
  splitRight: '/images/splitRight.webp',
  archFg: '/images/archFg.webp',
  frameTwo: '/images/frameTwo.webp',
};

export function CinemaScroll() {
  const { t } = useTranslation();
  const stageRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [selectedSuiteTab, setSelectedSuiteTab] = useState<SocialTab>('epoch');

  useScrollProgress(stageRef, controlsRef);
  useMouseParallax();

  const bridgeFacts = [
    { dt: t('panels.bridge.stat1dt'), dd: t('panels.bridge.stat1dd') },
    { dt: t('panels.bridge.stat2dt'), dd: t('panels.bridge.stat2dd') },
  ];

  function handleNavigateTab(tab: SocialTab) {
    setSelectedSuiteTab(tab);
    window.scrollTo({ top: 3900, behavior: 'smooth' });
  }

  return (
    <main className="site-shell">
      <a
        href="#social-suite"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          handleNavigateTab('epoch');
        }}
      >
        Skip to Social Experience
      </a>
      <section
        className="cinema-scroll"
        id="cinema"
        ref={stageRef}
        aria-label="REIMAGINE SOCIAL cinematic scroll experience"
      >
        <div className="stage">
          <div className="world">
            {/* Sky — farthest background */}
            <img
              className="scene-img sky-img"
              src={ASSETS.sky}
              alt="Atmospheric sky"
              width="1920"
              height="1080"
              decoding="async"
              fetchPriority="high"
            />

            {/* Navigation */}
            <SiteHeader isToolPage={false} onNavigateTab={handleNavigateTab} />

            {/* Back stack — mid layers */}
            <div className="back-stack">
              <img
                className="scene-img back-img back-four"
                src={ASSETS.backGlow}
                alt=""
                width="1920"
                height="1080"
                decoding="async"
                loading="lazy"
              />
              <img
                className="scene-img back-img back-bazaar"
                src={ASSETS.cityMidBack}
                alt=""
                width="1920"
                height="1080"
                decoding="async"
                loading="lazy"
              />
            </div>

            {/* Hero title — sized and positioned to fit inside the arch opening */}
            <h1 className="hero-title">REIMAGINE SOCIAL</h1>

            {/* Splitframes */}
            <img
              className="scene-img splitframe-img splitframe-left"
              src={ASSETS.splitLeft}
              alt=""
              width="1920"
              height="1080"
              decoding="async"
              loading="lazy"
            />
            <img
              className="scene-img splitframe-img splitframe-right"
              src={ASSETS.splitRight}
              alt=""
              width="1920"
              height="1080"
              decoding="async"
              loading="lazy"
            />

            {/* Arch foreground */}
            <img
              className="scene-img bridge-img"
              src={ASSETS.archFg}
              alt=""
              width="1920"
              height="1080"
              decoding="async"
              fetchPriority="high"
            />

            {/* Frame two close-up */}
            <img
              className="scene-img frame-two-img"
              src={ASSETS.frameTwo}
              alt=""
              width="1920"
              height="1080"
              decoding="async"
              loading="lazy"
            />

            {/* Navy shade overlay */}
            <div className="shade" />
          </div>

          {/* Intro copy — below world, inside stage */}
          <IntroCopy />

          {/* Story panel 1: The pause before you scroll */}
          <StoryPanel
            id="bridge-panel"
            className="story-panel-bridge"
            ariaLabel="Pause before you scroll"
            headingKey="panels.bridge.heading"
            bodyKey="panels.bridge.body"
            facts={bridgeFacts}
          />

          {/* Story panel 2: Hearth connection */}
          <StoryPanel
            id="safety"
            className="story-panel-bazaar"
            ariaLabel="Hearth community details"
            headingKey="panels.bazaar.heading"
            bodyKey="panels.bazaar.body"
            noteButton
          />

          {/* Embedded Social Suite on the final scroll page */}
          <section
            className="home-check-container"
            id="social-suite-wrapper"
            aria-label="REIMAGINE SOCIAL Suite interactive workspace"
          >
            <SocialShell initialTab={selectedSuiteTab} />
          </section>
        </div>
      </section>
    </main>
  );
}
