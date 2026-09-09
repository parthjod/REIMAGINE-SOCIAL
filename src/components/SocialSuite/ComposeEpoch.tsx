// src/components/SocialSuite/ComposeEpoch.tsx
import { useState } from 'react';
import type { IntentionTag } from '../../types/social';
import { useTranslation } from 'react-i18next';

interface ComposeEpochProps {
  promptTitle: string;
  onPost: (text: string, intention: IntentionTag, anchor: string) => void;
}

const TAGS: IntentionTag[] = [
  'Deep Reflection',
  'Creative Spark',
  'Quiet Observation',
  'Unfiltered Life',
  'Philosophical',
  'Poetic',
];

import { sanitizeText } from '../../lib/sanitize';

export function ComposeEpoch({ promptTitle, onPost }: ComposeEpochProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [anchor, setAnchor] = useState('');
  const [selectedTag, setSelectedTag] = useState<IntentionTag>('Deep Reflection');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanText = sanitizeText(text, 1200);
    const cleanAnchor = sanitizeText(anchor, 150);
    if (!cleanText) return;
    onPost(cleanText, selectedTag, cleanAnchor);
    setText('');
    setAnchor('');
    setIsOpen(false);
  }

  if (!isOpen) {
    return (
      <div className="compose-collapsed-bar" onClick={() => setIsOpen(true)}>
        <div className="compose-avatar-thumb">
          <span>✎</span>
        </div>
        <div className="compose-prompt-teaser">
          <span>{t('social.epoch.composePrompt')}</span>
        </div>
        <button type="button" className="compose-expand-btn">
          Share Reflection
        </button>
      </div>
    );
  }

  return (
    <form className="compose-epoch-card" onSubmit={handleSubmit}>
      <div className="compose-header">
        <div className="compose-header-left">
          <span className="compose-kicker">Responding to Today’s Prompt</span>
          <p className="compose-prompt-ref">"{promptTitle}"</p>
        </div>
        <button
          type="button"
          className="compose-close-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Cancel reflection"
        >
          ✕
        </button>
      </div>

      <div className="compose-field">
        <label htmlFor="compose-anchor" className="compose-label">
          Anchor Context (e.g. "A failed painting at 4pm", "Walking in rain"):
        </label>
        <input
          id="compose-anchor"
          type="text"
          className="compose-input"
          placeholder="Where or what triggered this reflection?"
          value={anchor}
          onChange={(e) => setAnchor(e.target.value)}
        />
      </div>

      <div className="compose-field">
        <label htmlFor="compose-text" className="compose-label">
          Your Unhurried Words (No clickbait, pure presence):
        </label>
        <textarea
          id="compose-text"
          className="compose-textarea"
          rows={4}
          placeholder="Speak without needing to perform. What was the quiet lesson?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="compose-tags-section">
        <span className="compose-label">Choose Intention Frequency:</span>
        <div className="compose-tag-pills">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`compose-tag-pill ${selectedTag === tag ? 'selected' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="compose-footer">
        <span className="compose-wellness-hint">
          🌱 Zero algorithms will rank this. It will be received with human care.
        </span>
        <div className="compose-actions">
          <button type="button" className="compose-cancel-btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button type="submit" className="compose-submit-btn" disabled={!text.trim()}>
            {t('social.epoch.shareBtn')}
          </button>
        </div>
      </div>
    </form>
  );
}
