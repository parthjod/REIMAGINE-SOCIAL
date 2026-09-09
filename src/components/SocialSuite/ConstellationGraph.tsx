// src/components/SocialSuite/ConstellationGraph.tsx
import { useState } from 'react';
import type { ConstellationNode } from '../../types/social';
import { NodeDetailsModal } from './NodeDetailsModal';
import { useTranslation } from 'react-i18next';

interface ConstellationGraphProps {
  nodes: ConstellationNode[];
  onSendLetter: (recipientName: string) => void;
}

export function ConstellationGraph({ nodes, onSendLetter }: ConstellationGraphProps) {
  const { t } = useTranslation();
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);
  const [activeCluster, setActiveCluster] = useState<string>('all');
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);

  const clusters = ['all', ...Array.from(new Set(nodes.map((n) => n.cluster)))];

  const filteredNodes =
    activeCluster === 'all' ? nodes : nodes.filter((n) => n.cluster === activeCluster);

  // Compute SVG connections
  const connectionsList: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    key: string;
    color: string;
  }[] = [];
  const nodeMap = new Map<string, ConstellationNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  nodes.forEach((n) => {
    n.connections.forEach((targetId) => {
      const target = nodeMap.get(targetId);
      if (target && n.id < target.id) {
        connectionsList.push({
          x1: n.x,
          y1: n.y,
          x2: target.x,
          y2: target.y,
          key: `${n.id}-${target.id}`,
          color: n.auraColor,
        });
      }
    });
  });

  return (
    <div className="constellation-container" aria-label="Constellation Human Network">
      <header className="constellation-header">
        <div className="constellation-title-col">
          <h3>{t('social.constellation.title')}</h3>
          <p>{t('social.constellation.subtitle')}</p>
        </div>

        {/* Cluster Filter */}
        <div className="cluster-filter-pills">
          {clusters.map((c) => (
            <button
              key={c}
              type="button"
              className={`cluster-pill ${activeCluster === c ? 'active' : ''}`}
              onClick={() => setActiveCluster(c)}
            >
              {c === 'all' ? t('social.constellation.allClusters') : c}
            </button>
          ))}
        </div>
      </header>

      {/* The Cosmic Celestial Graph Map */}
      <div className="constellation-canvas-box">
        <div className="space-dust-bg" />

        <svg className="constellation-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="orbit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {connectionsList.map((conn) => {
            const parts = conn.key.split('-');
            const p0 = parts[0];
            const p1 = parts[1];
            const isHighlighted =
              hoveredNode &&
              p0 &&
              p1 &&
              (hoveredNode.connections.includes(p0) || hoveredNode.connections.includes(p1));

            return (
              <line
                key={conn.key}
                x1={`${conn.x1}%`}
                y1={`${conn.y1}%`}
                x2={`${conn.x2}%`}
                y2={`${conn.y2}%`}
                stroke={isHighlighted ? '#fbbf24' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isHighlighted ? '0.6' : '0.25'}
                strokeDasharray={isHighlighted ? 'none' : '1, 1'}
                className="orbit-connection-line"
              />
            );
          })}
        </svg>

        {/* Interactive Human Nodes */}
        {filteredNodes.map((node) => {
          const isHovered = hoveredNode?.id === node.id;
          return (
            <div
              key={node.id}
              className={`constellation-star-node ${isHovered ? 'hovered' : ''}`}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                ['--aura-color' as string]: node.auraColor,
              }}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedNode(node);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open profile for ${node.name}`}
            >
              <div className="star-pulse-ring" />
              <div className="star-avatar-circle">
                <img src={node.avatar} alt={node.name} />
              </div>

              {/* Tooltip Label */}
              <div className="star-tooltip">
                <span className="star-name">{node.name}</span>
                <span className="star-role">{node.role}</span>
                <span className="star-orbit-tag">{node.cluster}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <footer className="constellation-legend">
        <div className="legend-item">
          <span className="legend-dot orbit-dot" />
          <span>Nodes represent human creators & thinkers (not followers)</span>
        </div>
        <div className="legend-item">
          <span className="legend-line" />
          <span>Lines represent mutual resonance & shared frequencies</span>
        </div>
        <div className="legend-item">
          <span className="legend-accent">✦ Zero algorithms determine your orbit</span>
        </div>
      </footer>

      {/* Modal on Click */}
      {selectedNode && (
        <NodeDetailsModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onSendLetter={onSendLetter}
        />
      )}
    </div>
  );
}
