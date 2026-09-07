// src/components/SocialSuite/EpochCard.tsx
import type { EpochPost, ResonanceType } from '../../types/social';
import { ResonancePicker } from './ResonancePicker';

interface EpochCardProps {
  post: EpochPost;
  onToggleResonance: (postId: string, type: ResonanceType) => void;
  onSendLetter?: ((recipientName: string) => void) | undefined;
}

const INTENTION_COLORS: Record<string, string> = {
  'Deep Reflection': '#38bdf8',
  'Creative Spark': '#fbbf24',
  'Quiet Observation': '#34d399',
  'Unfiltered Life': '#f43f5e',
  'Philosophical': '#a78bfa',
  'Poetic': '#ec4899',
};

export function EpochCard({ post, onToggleResonance, onSendLetter }: EpochCardProps) {
  const intentionColor = INTENTION_COLORS[post.intention] || '#38bdf8';

  return (
    <article className="epoch-card" aria-label={`Reflection by ${post.author.name}`}>
      {/* Header */}
      <header className="epoch-card-header">
        <div className="epoch-author-info">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="epoch-avatar"
            loading="lazy"
          />
          <div className="epoch-meta">
            <div className="epoch-name-row">
              <span className="epoch-name">{post.author.name}</span>
              <span className="epoch-handle">{post.author.handle}</span>
            </div>
            <div className="epoch-subline">
              <span>{post.author.role}</span>
              <span className="dot-sep">•</span>
              <span>{post.author.city}</span>
            </div>
          </div>
        </div>

        <div className="epoch-badge-col">
          <span
            className="epoch-intention-badge"
            style={{
              borderColor: `${intentionColor}40`,
              backgroundColor: `${intentionColor}18`,
              color: intentionColor,
            }}
          >
            {post.intention}
          </span>
          <span className="epoch-time">{post.timestamp}</span>
        </div>
      </header>

      {/* Anchor Context */}
      {post.promptAnchor && (
        <div className="epoch-prompt-anchor">
          <span className="anchor-mark">⚲</span>
          <span className="anchor-text">{post.promptAnchor}</span>
        </div>
      )}

      {/* Body Text */}
      <div className="epoch-card-body">
        <p>{post.text}</p>
        {post.quote && (
          <blockquote className="epoch-quote">
            "{post.quote}"
          </blockquote>
        )}
      </div>

      {/* Footer / Resonances */}
      <footer className="epoch-card-footer">
        <ResonancePicker
          resonances={post.resonances}
          userResonances={post.userResonances}
          onToggle={(type) => onToggleResonance(post.id, type)}
        />

        {onSendLetter && (
          <button
            type="button"
            className="card-letter-cta"
            onClick={() => onSendLetter(post.author.name)}
            title={`Send a slow letter to ${post.author.name}`}
          >
            <span aria-hidden="true">✉</span>
            <span>Slow Letter</span>
          </button>
        )}
      </footer>
    </article>
  );
}
