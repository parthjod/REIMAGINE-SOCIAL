// src/components/SocialSuite/SocialShell.tsx
import { useState, useEffect } from 'react';
import { useSocialState, type SocialTab } from '../../hooks/useSocialState';
import { EpochFeed } from './EpochFeed';
import { CampfireRoom } from './CampfireRoom';
import { ConstellationGraph } from './ConstellationGraph';
import { SlowLettersView } from './SlowLettersView';
import { EscapeRadar } from './EscapeRadar';
import { MatrixCompare } from './MatrixCompare';
import { useTranslation } from 'react-i18next';
import '../../styles/SocialSuite.css';
import '../../styles/Campfire.css';
import '../../styles/Constellation.css';

interface SocialShellProps {
  initialTab?: SocialTab;
}

export function SocialShell({ initialTab = 'epoch' }: SocialShellProps) {
  const { t } = useTranslation();
  const {
    activeTab,
    setActiveTab,
    epoch,
    toggleResonance,
    addPost,
    campfireThoughts,
    addCampfireThought,
    activeSound,
    soundVolume,
    toggleSound,
    updateVolume,
    nodes,
    letters,
    sendLetter,
    openLetter,
    stats,
  } = useSocialState();

  const [prefilledRecipient, setPrefilledRecipient] = useState<string | null>(null);

  // Sync activeTab whenever initialTab prop changes from external navigation
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, setActiveTab]);

  function handleSendLetterTo(name: string) {
    setPrefilledRecipient(name);
    setActiveTab('letters');
  }

  return (
    <section
      id="social-suite"
      className="social-suite-shell"
      aria-label="REIMAGINE SOCIAL Experience"
    >
      {/* HUD Navigation Tabs */}
      <nav className="social-tabs-nav" aria-label="Social experience modules">
        <button
          type="button"
          className={`tab-item ${activeTab === 'epoch' ? 'active' : ''}`}
          onClick={() => setActiveTab('epoch')}
        >
          <span className="tab-icon">☀️</span>
          <span className="tab-label">{t('social.nav.epoch')}</span>
          <span className="tab-indicator" />
        </button>

        <button
          type="button"
          className={`tab-item ${activeTab === 'campfire' ? 'active' : ''}`}
          onClick={() => setActiveTab('campfire')}
        >
          <span className="tab-icon">🔥</span>
          <span className="tab-label">{t('social.nav.campfire')}</span>
          {activeSound && <span className="tab-audio-pulse">♩</span>}
          <span className="tab-indicator" />
        </button>

        <button
          type="button"
          className={`tab-item ${activeTab === 'constellation' ? 'active' : ''}`}
          onClick={() => setActiveTab('constellation')}
        >
          <span className="tab-icon">🌌</span>
          <span className="tab-label">{t('social.nav.constellation')}</span>
          <span className="tab-indicator" />
        </button>

        <button
          type="button"
          className={`tab-item ${activeTab === 'letters' ? 'active' : ''}`}
          onClick={() => {
            setPrefilledRecipient(null);
            setActiveTab('letters');
          }}
        >
          <span className="tab-icon">✉</span>
          <span className="tab-label">{t('social.nav.letters')}</span>
          <span className="tab-indicator" />
        </button>

        <button
          type="button"
          className={`tab-item ${activeTab === 'radar' ? 'active' : ''}`}
          onClick={() => setActiveTab('radar')}
        >
          <span className="tab-icon">🧭</span>
          <span className="tab-label">{t('social.nav.radar')}</span>
          <span className="tab-indicator" />
        </button>

        <button
          type="button"
          className={`tab-item ${activeTab === 'manifesto' ? 'active' : ''}`}
          onClick={() => setActiveTab('manifesto')}
        >
          <span className="tab-icon">✦</span>
          <span className="tab-label">{t('social.nav.manifesto')}</span>
          <span className="tab-indicator" />
        </button>
      </nav>

      {/* Active Tab Panel */}
      <div className="social-suite-content">
        {activeTab === 'epoch' && (
          <EpochFeed
            epoch={epoch}
            onToggleResonance={toggleResonance}
            onAddPost={addPost}
            onSendLetter={handleSendLetterTo}
          />
        )}

        {activeTab === 'campfire' && (
          <CampfireRoom
            thoughts={campfireThoughts}
            onAddThought={addCampfireThought}
            activeSound={activeSound}
            soundVolume={soundVolume}
            onToggleSound={toggleSound}
            onUpdateVolume={updateVolume}
          />
        )}

        {activeTab === 'constellation' && (
          <ConstellationGraph
            nodes={nodes}
            onSendLetter={handleSendLetterTo}
          />
        )}

        {activeTab === 'letters' && (
          <SlowLettersView
            letters={letters}
            onSendLetter={sendLetter}
            onOpenLetter={openLetter}
            prefilledRecipient={prefilledRecipient}
          />
        )}

        {activeTab === 'radar' && (
          <EscapeRadar stats={stats} />
        )}

        {activeTab === 'manifesto' && (
          <MatrixCompare />
        )}
      </div>
    </section>
  );
}
