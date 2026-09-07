// src/components/SocialSuite/EscapeRadar.tsx
import { useState } from 'react';
import type { EscapeMetrics } from '../../types/social';
import { useTranslation } from 'react-i18next';

interface EscapeRadarProps {
  stats: EscapeMetrics;
}

export function EscapeRadar({ stats }: EscapeRadarProps) {
  const { t } = useTranslation();
  const [claritySlider, setClaritySlider] = useState(85);

  return (
    <div className="escape-radar-container" aria-label="Escape & Digital Wellness Radar">
      <header className="radar-header">
        <div className="radar-title-col">
          <div className="radar-badge">
            <span className="badge-spark">✧</span>
            <span>Digital Freedom Index</span>
          </div>
          <h3>{t('social.radar.title')}</h3>
          <p>{t('social.radar.subtitle')}</p>
        </div>
      </header>

      {/* Top 4 Metric Cards */}
      <div className="radar-metric-grid">
        <div className="radar-card highlight">
          <div className="radar-card-top">
            <span className="card-icon">⏳</span>
            <span className="card-trend">+3.4h reclaimed</span>
          </div>
          <span className="radar-num">{stats.doomscrollHoursSaved} hrs</span>
          <span className="radar-lbl">{t('social.radar.hoursSaved')}</span>
          <p className="radar-desc">Time that would have been consumed by infinite algorithm slot machines.</p>
        </div>

        <div className="radar-card">
          <div className="radar-card-top">
            <span className="card-icon">🧠</span>
            <span className="card-trend">Optimal Calm</span>
          </div>
          <span className="radar-num">{stats.mindfulIntentionScore}%</span>
          <span className="radar-lbl">{t('social.radar.intentionScore')}</span>
          <p className="radar-desc">Ratio of deliberate reading and reflection versus passive swiping.</p>
        </div>

        <div className="radar-card">
          <div className="radar-card-top">
            <span className="card-icon">🫂</span>
            <span className="card-trend">Qualitative</span>
          </div>
          <span className="radar-num">{stats.deepConnectionsFormed}</span>
          <span className="radar-lbl">{t('social.radar.deepConnections')}</span>
          <p className="radar-desc">Meaningful resonances shared through unhurried letters and thoughts.</p>
        </div>

        <div className="radar-card">
          <div className="radar-card-top">
            <span className="card-icon">🕯️</span>
            <span className="card-trend">Restorative</span>
          </div>
          <span className="radar-num">{stats.quietMinutesInPresence} min</span>
          <span className="radar-lbl">{t('social.radar.quietMinutes')}</span>
          <p className="radar-desc">Time spent in the Synchronous Campfire listening to ambient nature.</p>
        </div>
      </div>

      {/* Qualitative Resonance Distribution */}
      <div className="resonance-breakdown-panel">
        <h4>Emotional Resonance Spectrum</h4>
        <p className="breakdown-sub">
          Unlike platforms that optimize for rage and dopamine spikes, REIMAGINE SOCIAL cultivates grounding human frequencies:
        </p>

        <div className="spectrum-bars">
          <div className="spectrum-row">
            <div className="spectrum-label-col">
              <span>🌿 Grounding Calm</span>
              <strong>42%</strong>
            </div>
            <div className="spectrum-bar-track">
              <div className="spectrum-bar-fill fill-grounding" style={{ width: '42%' }} />
            </div>
          </div>

          <div className="spectrum-row">
            <div className="spectrum-label-col">
              <span>🌌 Perspective Shift</span>
              <strong>31%</strong>
            </div>
            <div className="spectrum-bar-track">
              <div className="spectrum-bar-fill fill-perspective" style={{ width: '31%' }} />
            </div>
          </div>

          <div className="spectrum-row">
            <div className="spectrum-label-col">
              <span>🫂 Shared Humanity</span>
              <strong>18%</strong>
            </div>
            <div className="spectrum-bar-track">
              <div className="spectrum-bar-fill fill-humanity" style={{ width: '18%' }} />
            </div>
          </div>

          <div className="spectrum-row">
            <div className="spectrum-label-col">
              <span>⚡ Creative Spark</span>
              <strong>9%</strong>
            </div>
            <div className="spectrum-bar-track">
              <div className="spectrum-bar-fill fill-spark" style={{ width: '9%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Cognitive Clarity Simulator */}
      <div className="clarity-simulator-card">
        <div className="sim-header">
          <h4>Mind State Simulator: Noise vs. Presence</h4>
          <span className="sim-score">Clarity Level: {claritySlider}%</span>
        </div>
        <p className="sim-sub">
          Slide to feel how your nervous system shifts when moving from an extractive algorithmic feed to an intentional social medium.
        </p>

        <input
          type="range"
          min="10"
          max="100"
          value={claritySlider}
          onChange={(e) => setClaritySlider(Number(e.target.value))}
          className="clarity-slider"
          aria-label="Cognitive clarity simulation slider"
        />

        <div className="sim-states-row">
          <div className={`sim-state-box ${claritySlider < 45 ? 'active-state' : ''}`}>
            <span className="state-badge bad">Algorithmic Trap (10% - 40%)</span>
            <h5>Extractive Casino</h5>
            <ul>
              <li>Infinite scrolling loops</li>
              <li>Anxiety over view counts & likes</li>
              <li>Fragmented 7-second attention span</li>
              <li>Manufactured outrage & comparison</li>
            </ul>
          </div>

          <div className={`sim-state-box ${claritySlider >= 45 ? 'active-state' : ''}`}>
            <span className="state-badge good">REIMAGINE SOCIAL Architecture (50% - 100%)</span>
            <h5>Human Presence</h5>
            <ul>
              <li>Finite daily epochs (definite completion)</li>
              <li>Qualitative resonance (zero public counts)</li>
              <li>Deep epistolary letters at golden hour</li>
              <li>Peaceful synchronous gathering</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Escape Milestones Checklist */}
      <div className="escape-milestones-card">
        <h4>Your ESCAPE Challenge Progress</h4>
        <div className="milestones-checklist">
          <div className="milestone-item completed">
            <span className="milestone-check">✓</span>
            <div className="milestone-text">
              <strong>Bypassed The Infinite Casino</strong>
              <p>Completed today’s finite epoch without triggering algorithmic rabbit holes.</p>
            </div>
          </div>
          <div className="milestone-item completed">
            <span className="milestone-check">✓</span>
            <div className="milestone-text">
              <strong>Eradicated Vanity Metrics</strong>
              <p>Replaced follower counters and public likes with four-dimensional human resonance.</p>
            </div>
          </div>
          <div className="milestone-item completed">
            <span className="milestone-check">✓</span>
            <div className="milestone-text">
              <strong>Synchronous Co-Presence</strong>
              <p>Gathered around the virtual campfire with ambient natural acoustics.</p>
            </div>
          </div>
          <div className="milestone-item completed">
            <span className="milestone-check">✓</span>
            <div className="milestone-text">
              <strong>Temporal Letter Sealed</strong>
              <p>Sent an unhurried message scheduled for golden-hour delivery.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
