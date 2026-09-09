// src/components/SocialSuite/NodeDetailsModal.tsx
import type { ConstellationNode } from '../../types/social';

interface NodeDetailsModalProps {
  node: ConstellationNode;
  onClose: () => void;
  onSendLetter: (recipientName: string) => void;
}

export function NodeDetailsModal({ node, onClose, onSendLetter }: NodeDetailsModalProps) {
  return (
    <div className="node-modal-overlay" role="dialog" aria-modal="true">
      <div className="node-modal-card">
        <button
          type="button"
          className="node-modal-close"
          onClick={onClose}
          aria-label="Close star details"
        >
          ✕
        </button>

        <div className="node-modal-header">
          <div className="node-modal-avatar-box">
            <img src={node.avatar} alt={node.name} className="node-modal-avatar" />
            <div
              className="node-aura-glow-ring"
              style={{ borderColor: node.auraColor, boxShadow: `0 0 24px ${node.auraColor}60` }}
            />
          </div>

          <div className="node-modal-info">
            <span className="node-cluster-badge">{node.cluster}</span>
            <h3>{node.name}</h3>
            <span className="node-handle">
              {node.handle} • {node.city}
            </span>
            <p className="node-role">{node.role}</p>
          </div>
        </div>

        <div className="node-modal-body">
          <div className="node-bio-section">
            <h4>Human Context</h4>
            <p>{node.bio}</p>
          </div>

          <div className="node-thought-section">
            <h4>Recent Anchored Thought</h4>
            <blockquote className="node-thought-quote">"{node.recentThought}"</blockquote>
          </div>

          <div className="node-frequencies-section">
            <h4>Resonant Frequencies</h4>
            <div className="node-freq-tags">
              {node.frequencies.map((freq) => (
                <span key={freq} className="freq-pill">
                  #{freq}
                </span>
              ))}
            </div>
          </div>

          <div className="node-metric-row">
            <div className="node-metric-box">
              <span className="metric-num">{node.resonanceTotal}</span>
              <span className="metric-lbl">Total Resonances Felt</span>
            </div>
            <div className="node-metric-box">
              <span className="metric-num">{node.connections.length}</span>
              <span className="metric-lbl">Mutual Orbits</span>
            </div>
            <div className="node-metric-box">
              <span className="metric-num">0</span>
              <span className="metric-lbl">Follower Pressure</span>
            </div>
          </div>
        </div>

        <footer className="node-modal-footer">
          <button
            type="button"
            className="node-letter-btn"
            onClick={() => {
              onClose();
              onSendLetter(node.name);
            }}
          >
            <span>✉</span>
            <span>Write A Slow Letter to {node.name.split(' ')[0]}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
