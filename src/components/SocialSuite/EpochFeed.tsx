// src/components/SocialSuite/EpochFeed.tsx
import { useState } from 'react';
import type { DailyEpoch, IntentionTag, ResonanceType } from '../../types/social';
import { EpochCard } from './EpochCard';
import { ComposeEpoch } from './ComposeEpoch';
import { CaughtUpModal } from './CaughtUpModal';
import { useTranslation } from 'react-i18next';

interface EpochFeedProps {
  epoch: DailyEpoch;
  onToggleResonance: (postId: string, type: ResonanceType) => void;
  onAddPost: (text: string, intention: IntentionTag, anchor: string) => void;
  onSendLetter?: (recipientName: string) => void;
}

export function EpochFeed({
  epoch,
  onToggleResonance,
  onAddPost,
  onSendLetter,
}: EpochFeedProps) {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === 'hi';
  const [showMindfulModal, setShowMindfulModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredPosts = activeFilter === 'all'
    ? epoch.posts
    : epoch.posts.filter((p) => p.intention === activeFilter);

  const themeTitle = isHindi ? epoch.hindiThemeTitle : epoch.themeTitle;
  const promptText = isHindi ? epoch.hindiPrompt : epoch.prompt;

  return (
    <div className="epoch-feed-container">
      {/* Epoch Theme Hero Header */}
      <header className="epoch-header-banner">
        <div className="epoch-meta-pill">
          <span className="epoch-number">Epoch #{epoch.epochNumber}</span>
          <span className="dot-sep">•</span>
          <span className="epoch-date">{epoch.dateStr}</span>
          <span className="dot-sep">•</span>
          <span className="epoch-finite-tag">Finite Stream (6/6 Reflections)</span>
        </div>

        <h2 className="epoch-theme-title">{themeTitle}</h2>

        <div className="epoch-prompt-capsule">
          <div className="prompt-label-row">
            <span className="prompt-icon">✦</span>
            <span className="prompt-label">Today’s Anchoring Question</span>
          </div>
          <p className="prompt-quote">"{promptText}"</p>
        </div>

        <p className="epoch-curator-note">{epoch.curatorNote}</p>
      </header>

      {/* Compose Component */}
      <ComposeEpoch
        promptTitle={promptText}
        onPost={onAddPost}
      />

      {/* Filter Tabs */}
      <div className="epoch-filter-bar">
        <span className="filter-label">Explore Intentions:</span>
        <div className="filter-pills">
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Reflections ({epoch.posts.length})
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'Quiet Observation' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Quiet Observation')}
          >
            🌿 Quiet Observation
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'Deep Reflection' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Deep Reflection')}
          >
            🌌 Deep Reflection
          </button>
          <button
            type="button"
            className={`filter-pill ${activeFilter === 'Creative Spark' ? 'active' : ''}`}
            onClick={() => setActiveFilter('Creative Spark')}
          >
            ⚡ Creative Spark
          </button>
        </div>
      </div>

      {/* List of Epoch Cards */}
      <div className="epoch-card-stream">
        {filteredPosts.map((post) => (
          <EpochCard
            key={post.id}
            post={post}
            onToggleResonance={onToggleResonance}
            onSendLetter={onSendLetter}
          />
        ))}
      </div>

      {/* Finite Horizon Completion Card */}
      <div className="epoch-completion-horizon">
        <div className="horizon-glow" />
        <div className="horizon-content">
          <span className="horizon-badge">✧ CLEAR HORIZON REACHED ✧</span>
          <h3>You are completely caught up.</h3>
          <p>
            No algorithmic recommendations. No infinite scroll casino. You have honored today’s human circle.
          </p>
          <button
            type="button"
            className="horizon-breath-cta"
            onClick={() => setShowMindfulModal(true)}
          >
            <span>🌬️</span>
            <span>Take A Mindful Breath & Step Away</span>
          </button>
        </div>
      </div>

      {/* Mindful Modal */}
      {showMindfulModal && (
        <CaughtUpModal onClose={() => setShowMindfulModal(false)} />
      )}
    </div>
  );
}
