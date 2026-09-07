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
  sky:         '/images/sky.png',
  backGlow:    '/images/backGlow.png',
  cityMidBack: '/images/cityMidBack.png',
  splitLeft:   '/images/splitLeft.png',
  splitRight:  '/images/splitRight.png',
  archFg:      '/images/archFg.png',
  frameTwo:    '/images/frameTwo.png',
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
      <section
        className="cinema-scroll"
        id="cinema"
        ref={stageRef}
        aria-label="REIMAGINE SOCIAL cinematic scroll experience"
      >
        <div className="stage">
          <div className="world">
            {/* Sky — farthest background */}
            <img className="scene-img sky-img" src={ASSETS.sky} alt="" />

            {/* Navigation */}
            <SiteHeader isToolPage={false} onNavigateTab={handleNavigateTab} />

            {/* Back stack — mid layers */}
            <div className="back-stack">
              <img className="scene-img back-img back-four" src={ASSETS.backGlow} alt="" />
              <img className="scene-img back-img back-bazaar" src={ASSETS.cityMidBack} alt="" />
            </div>

            {/* Hero title — sized and positioned to fit inside the arch opening */}
            <h1 className="hero-title">REIMAGINE SOCIAL</h1>

            {/* Splitframes */}
            <img className="scene-img splitframe-img splitframe-left"  src={ASSETS.splitLeft}  alt="" />
            <img className="scene-img splitframe-img splitframe-right" src={ASSETS.splitRight} alt="" />

            {/* Arch foreground */}
            <img className="scene-img bridge-img" src={ASSETS.archFg} alt="" />

            {/* Frame two close-up */}
            <img className="scene-img frame-two-img" src={ASSETS.frameTwo} alt="" />

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
