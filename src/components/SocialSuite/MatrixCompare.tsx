// src/components/SocialSuite/MatrixCompare.tsx
import { useState } from 'react';

interface ParadigmItem {
  id: string;
  dimension: string;
  oldTrap: string;
  oldTrapDetail: string;
  pauseSolution: string;
  pauseDetail: string;
  humanImpact: string;
}

const PARADIGMS: ParadigmItem[] = [
  {
    id: 'stream',
    dimension: 'Content Architecture',
    oldTrap: 'The Infinite Slot-Machine Feed',
    oldTrapDetail: 'Endless scroll engineered with variable reward ratios to induce cognitive trance and doomscrolling.',
    pauseSolution: 'The Daily Finite Epoch',
    pauseDetail: '6 to 10 curated reflections anchored in a daily human inquiry. A clear horizon where you are caught up and free.',
    humanImpact: 'Eliminates screen trance; respects human circadian attention.',
  },
  {
    id: 'metrics',
    dimension: 'Feedback & Validation',
    oldTrap: 'Quantified Vanity Metrics',
    oldTrapDetail: 'Public like counts, view tallies, and follower counters turning human expression into competitive performance.',
    pauseSolution: '4D Qualitative Resonance',
    pauseDetail: 'Perspective Shift, Grounding Calm, Creative Spark, and Shared Humanity with zero public scorekeeping.',
    humanImpact: 'Banishes social comparison anxiety and algorithmic pandering.',
  },
  {
    id: 'graph',
    dimension: 'Social Topography',
    oldTrap: 'Follower Feudalism',
    oldTrapDetail: 'Power-law hierarchies where 0.1% of creators extract attention while 99.9% are audience consumers.',
    pauseSolution: 'Organic Constellations',
    pauseDetail: 'Spatial networks where kindred minds cluster around mutual philosophical, artistic, and craft frequencies.',
    humanImpact: 'Decentralizes community; creates genuine reciprocal kinship.',
  },
  {
    id: 'presence',
    dimension: 'Gathering & Presence',
    oldTrap: 'Broadcasting into the Void',
    oldTrapDetail: 'Asynchronous yelling into comment sections with toxic rage-farming and disconnected observers.',
    pauseSolution: 'The Synchronous Campfire',
    pauseDetail: 'Ambient gathering space with procedural nature soundscapes and ephemeral thought ripples.',
    humanImpact: 'Restores felt co-presence and nervous system calm.',
  },
  {
    id: 'correspondence',
    dimension: 'Intimate Communication',
    oldTrap: 'Ephemeral Dopamine Snaps',
    oldTrapDetail: 'Vanishing 10-second snaps and instant read-receipt anxiety demanding immediate shallow replies.',
    pauseSolution: 'Golden-Hour Slow Letters',
    pauseDetail: 'Unhurried correspondence sealed with wax and dispatched only at Sunrise or Sunset.',
    humanImpact: 'Revives deep epistolary thought and patient human relationships.',
  },
];

export function MatrixCompare() {
  const [selectedId, setSelectedId] = useState<string>('stream');
  const activeItem: ParadigmItem = PARADIGMS.find((p) => p.id === selectedId) ?? (PARADIGMS[0] as ParadigmItem);

  return (
    <div className="matrix-compare-container" aria-label="The Paradigm Shift Matrix">
      <header className="matrix-header">
        <div className="matrix-badge">
          <span className="badge-spark">✦</span>
          <span>The ESCAPE Blueprint</span>
        </div>
        <h3>The Paradigm Shift: From Extractive Feeds to Human Flourishing</h3>
        <p>
          Compare how mainstream platforms exploit psychological vulnerabilities versus how REIMAGINE SOCIAL systematically redesigns social architecture.
        </p>
      </header>

      {/* Tabs */}
      <div className="matrix-dimension-tabs">
        {PARADIGMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`matrix-tab-btn ${selectedId === item.id ? 'active' : ''}`}
            onClick={() => setSelectedId(item.id)}
          >
            {item.dimension}
          </button>
        ))}
      </div>

      {/* Side-by-Side Comparison Stage */}
      <div className="matrix-stage">
        {/* Left: Algorithmic Trap */}
        <div className="matrix-column trap-column">
          <div className="matrix-column-header">
            <span className="matrix-tag tag-trap">The Algorithmic Casino (Status Quo)</span>
            <h4>{activeItem.oldTrap}</h4>
          </div>
          <p className="matrix-col-body">{activeItem.oldTrapDetail}</p>
          <div className="matrix-callout callout-trap">
            <span className="callout-icon">⚠️</span>
            <span>Produces chronic dissociation, attentional fragmentation, and anxiety.</span>
          </div>
        </div>

        {/* Middle vs Divider */}
        <div className="matrix-vs-divider">
          <span>VS</span>
        </div>

        {/* Right: Pause Social */}
        <div className="matrix-column pause-column">
          <div className="matrix-column-header">
            <span className="matrix-tag tag-pause">The REIMAGINE SOCIAL Architecture</span>
            <h4>{activeItem.pauseSolution}</h4>
          </div>
          <p className="matrix-col-body">{activeItem.pauseDetail}</p>
          <div className="matrix-callout callout-pause">
            <span className="callout-icon">🌱</span>
            <span>{activeItem.humanImpact}</span>
          </div>
        </div>
      </div>

      {/* Full Matrix Overview Table */}
      <div className="matrix-table-wrap">
        <h4>Comprehensive Architecture Overview</h4>
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>Conventional Social (Instagram / X)</th>
              <th>REIMAGINE SOCIAL // ESCAPE</th>
            </tr>
          </thead>
          <tbody>
            {PARADIGMS.map((row) => (
              <tr key={row.id} className={row.id === selectedId ? 'highlight-row' : ''}>
                <td className="dim-cell">{row.dimension}</td>
                <td className="trap-cell">
                  <strong>{row.oldTrap}</strong>
                  <span>{row.oldTrapDetail}</span>
                </td>
                <td className="pause-cell">
                  <strong>{row.pauseSolution}</strong>
                  <span>{row.pauseDetail}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
