// src/components/SocialSuite/SlowLettersView.tsx
import { useState } from 'react';
import type { SlowLetter } from '../../types/social';
import { useTranslation } from 'react-i18next';
import { sanitizeText } from '../../lib/sanitize';

interface SlowLettersViewProps {
  letters: SlowLetter[];
  onSendLetter: (recipientName: string, subject: string, body: string, prompt: string) => void;
  onOpenLetter: (id: string) => void;
  prefilledRecipient?: string | null;
}

const SEAL_COLORS = [
  { name: 'Ruby Sunset', hex: '#f43f5e' },
  { name: 'Golden Amber', hex: '#fbbf24' },
  { name: 'Pine Jade', hex: '#10b981' },
  { name: 'Midnight Azure', hex: '#38bdf8' },
];

export function SlowLettersView({
  letters,
  onSendLetter,
  onOpenLetter,
  prefilledRecipient,
}: SlowLettersViewProps) {
  const { t } = useTranslation();
  const [isComposing, setIsComposing] = useState(Boolean(prefilledRecipient));
  const [recipient, setRecipient] = useState(prefilledRecipient || '');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [reflectionPrompt, setReflectionPrompt] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'dawn' | 'dusk'>('dusk');
  const [selectedSeal, setSelectedSeal] = useState('#fbbf24');
  const [activeLetterModal, setActiveLetterModal] = useState<SlowLetter | null>(null);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const cleanRecipient = sanitizeText(recipient, 80);
    const cleanSubject = sanitizeText(subject, 120);
    const cleanBody = sanitizeText(body, 3000);
    const cleanPrompt = sanitizeText(reflectionPrompt, 200);
    if (!cleanRecipient || !cleanBody) return;
    onSendLetter(cleanRecipient, cleanSubject || 'A Quiet Thought', cleanBody, cleanPrompt);
    setRecipient('');
    setSubject('');
    setBody('');
    setReflectionPrompt('');
    setIsComposing(false);
  }

  function handleSealClick(letter: SlowLetter) {
    if (!letter.isOpened) {
      onOpenLetter(letter.id);
    }
    setActiveLetterModal({ ...letter, isOpened: true });
  }

  return (
    <div className="slow-letters-container" aria-label="Slow epistolary correspondence">
      <header className="letters-header">
        <div className="letters-title-col">
          <h3>{t('social.letters.title')}</h3>
          <p>{t('social.letters.subtitle')}</p>
        </div>

        <button
          type="button"
          className="compose-letter-cta"
          onClick={() => setIsComposing(!isComposing)}
        >
          <span>✍</span>
          <span>{isComposing ? 'View Postbox' : t('social.letters.composeBtn')}</span>
        </button>
      </header>

      {/* Composition Drawer */}
      {isComposing && (
        <form className="letter-composer-card" onSubmit={handleSend}>
          <div className="composer-header">
            <h4>Pen An Unhurried Letter</h4>
            <span className="composer-sub">
              Delivered at golden hour to preserve emotional presence
            </span>
          </div>

          <div className="composer-form-grid">
            <div className="form-group">
              <label htmlFor="letter-recipient">Recipient Human:</label>
              <input
                id="letter-recipient"
                type="text"
                className="letter-input"
                placeholder="Name or handle (e.g. Mariana Silva, Arjun)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="letter-subject">Letter Title / Inscription:</label>
              <input
                id="letter-subject"
                type="text"
                className="letter-input"
                placeholder="What anchor are you writing about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="letter-body">The Letter (Take your time, let it breathe):</label>
            <textarea
              id="letter-body"
              rows={6}
              className="letter-textarea"
              placeholder="Dear friend... I wanted to share something that does not belong in a short feed..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="letter-prompt">Reflective Question for the Recipient (Optional):</label>
            <input
              id="letter-prompt"
              type="text"
              className="letter-input"
              placeholder="e.g. When did you last feel quiet awe?"
              value={reflectionPrompt}
              onChange={(e) => setReflectionPrompt(e.target.value)}
            />
          </div>

          <div className="composer-controls-row">
            {/* Delivery Timing */}
            <div className="delivery-timing-selector">
              <span className="timing-label">Golden Hour Dispatch:</span>
              <div className="timing-pills">
                <button
                  type="button"
                  className={`timing-pill ${deliveryMode === 'dusk' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('dusk')}
                >
                  🌅 Sunset Dispatch (18:30)
                </button>
                <button
                  type="button"
                  className={`timing-pill ${deliveryMode === 'dawn' ? 'selected' : ''}`}
                  onClick={() => setDeliveryMode('dawn')}
                >
                  🌄 Sunrise Dispatch (06:00)
                </button>
              </div>
            </div>

            {/* Wax Seal Choice */}
            <div className="wax-seal-selector">
              <span className="timing-label">Wax Seal Stamp:</span>
              <div className="seal-color-swatches">
                {SEAL_COLORS.map((seal) => (
                  <button
                    key={seal.hex}
                    type="button"
                    className={`seal-swatch ${selectedSeal === seal.hex ? 'active' : ''}`}
                    style={{ backgroundColor: seal.hex }}
                    onClick={() => setSelectedSeal(seal.hex)}
                    title={seal.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="composer-footer">
            <button
              type="button"
              className="composer-cancel"
              onClick={() => setIsComposing(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="composer-seal-submit"
              disabled={!recipient.trim() || !body.trim()}
            >
              <span>✦</span>
              <span>{t('social.letters.sealBtn')}</span>
            </button>
          </div>
        </form>
      )}

      {/* Letters Grid */}
      <div className="letters-postbox-grid">
        {letters.map((letter) => {
          return (
            <div
              key={letter.id}
              className={`letter-envelope-card ${letter.isOpened ? 'opened' : 'sealed'}`}
              onClick={() => handleSealClick(letter)}
              role="button"
              tabIndex={0}
              aria-label={`Letter from ${letter.sender.name}: ${letter.subject}`}
            >
              <div className="envelope-top-flap" />

              <div className="envelope-content">
                <div className="envelope-stamp-row">
                  <span className="dispatch-badge">
                    {letter.isDelivered ? '✓ Delivered' : '⏳ In Transit via Golden Hour'}
                  </span>
                  <span className="stamp-time">{letter.sentTime}</span>
                </div>

                <div className="envelope-sender-meta">
                  <img src={letter.sender.avatar} alt={letter.sender.name} className="sender-avatar" />
                  <div className="sender-names">
                    <span className="sender-name">{letter.sender.name}</span>
                    <span className="sender-city">{letter.sender.city}</span>
                  </div>
                </div>

                <h4 className="envelope-subject">{letter.subject}</h4>

                <p className="envelope-preview">
                  {letter.isOpened
                    ? letter.body.slice(0, 140) + '...'
                    : 'A sealed slow correspondence awaits your attention. Tap to melt wax.'}
                </p>

                {/* Wax Seal Stamp */}
                <div className="envelope-wax-stamp" style={{ backgroundColor: letter.sealColor }}>
                  <span className="stamp-crest">REIMAGINE</span>
                  <span className="stamp-status">
                    {letter.isOpened ? 'UNSEALED' : 'SEALED'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Open Letter Modal */}
      {activeLetterModal && (
        <div className="letter-reading-overlay" role="dialog" aria-modal="true">
          <div className="parchment-letter-modal">
            <button
              type="button"
              className="parchment-close"
              onClick={() => setActiveLetterModal(null)}
              aria-label="Close letter"
            >
              ✕
            </button>

            <div className="parchment-header">
              <div className="parchment-stamp">
                <span className="parchment-wax-seal" style={{ backgroundColor: activeLetterModal.sealColor }}>
                  REIMAGINE
                </span>
                <span className="parchment-date">{activeLetterModal.deliveryTime}</span>
              </div>

              <h3>{activeLetterModal.subject}</h3>
              <p className="parchment-byline">
                From {activeLetterModal.sender.name} ({activeLetterModal.sender.city}) to {activeLetterModal.recipientName}
              </p>
            </div>

            <div className="parchment-body">
              {activeLetterModal.body.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {activeLetterModal.reflectionPrompt && (
              <div className="parchment-prompt-box">
                <span className="prompt-ribbon">Reflective Inquiry:</span>
                <p>"{activeLetterModal.reflectionPrompt}"</p>
              </div>
            )}

            <footer className="parchment-footer">
              <button
                type="button"
                className="reply-letter-btn"
                onClick={() => {
                  setRecipient(activeLetterModal.sender.name);
                  setActiveLetterModal(null);
                  setIsComposing(true);
                }}
              >
                <span>✍</span>
                <span>Send A Slow Letter in Return</span>
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
