import React, { useState, useMemo } from 'react';
import { Trophy, Award, Sparkles, Layers } from 'lucide-react';
import { WINNERS_DATA } from '../data/winners';
import { PROBLEMS } from '../data/participants';

export default function WinnersView() {
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('all');

  const filteredWinners = useMemo(() => {
    if (selectedTrackFilter === 'all') return WINNERS_DATA;
    return WINNERS_DATA.filter(w => w.trackKey === selectedTrackFilter);
  }, [selectedTrackFilter]);

  // Interactive 3D tilt effect
  const handleMouseMove = (e, cardEl) => {
    const rect = cardEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardEl.style.transform = `perspective(1000px) rotateY(${x * 16}deg) rotateX(${y * -16}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (cardEl) => {
    cardEl.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)';
  };

  return (
    <div className="winners-view">
      {/* Track Filter Pills */}
      <div className="filter-pills-row" style={{ marginBottom: '40px' }}>
        <button
          className={`filter-pill ${selectedTrackFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTrackFilter('all')}
          style={
            selectedTrackFilter === 'all'
              ? {
                  backgroundColor: '#FFB627',
                  borderColor: '#FFB627',
                  color: '#000',
                  boxShadow: '0 0 25px rgba(255, 182, 39, 0.5)'
                }
              : {}
          }
        >
          <Layers size={14} />
          <span>All 5 Problem Tracks</span>
        </button>

        {Object.entries(PROBLEMS).map(([key, prob]) => {
          const isActive = selectedTrackFilter === key;
          const isDarkText = key === 'MarketLink' || key === 'Maternal' || key === 'SafetyNetwork';
          return (
            <button
              key={key}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedTrackFilter(key)}
              style={
                isActive
                  ? {
                      backgroundColor: prob.color,
                      borderColor: prob.color,
                      color: isDarkText ? '#111' : '#FFF',
                      boxShadow: `0 0 25px ${prob.color}`
                    }
                  : {}
              }
            >
              <span>{prob.emoji}</span>
              <span>{prob.label}</span>
            </button>
          );
        })}
      </div>

      {/* Domain Sections */}
      {filteredWinners.map(domain => {
        const prob = PROBLEMS[domain.trackKey] || {};
        return (
          <div key={domain.number} className="domain-block">
            <div
              className="domain-header"
              style={{ '--domain-color': prob.color || '#FFB627' }}
            >
              <div className="domain-num">TRACK {domain.number}</div>
              <h2 className="domain-title">
                {prob.emoji} {domain.title}
              </h2>
              <p className="domain-desc">{domain.description}</p>
            </div>

            <div className="podium-grid">
              {domain.cards.map((c, i) => {
                const isChampion = c.place === 1;
                return (
                  <div
                    key={i}
                    className={`winner-podium-card ${isChampion ? 'place-1' : ''}`}
                    style={{ '--rank-color': c.color }}
                    onMouseMove={e => handleMouseMove(e, e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(e.currentTarget)}
                  >
                    {isChampion && <span className="crown-ribbon">👑</span>}

                    <div className="rank-badge-tag">
                      {c.place === 1 ? <Trophy size={14} /> : <Award size={14} />}
                      <span>{c.rank}</span>
                    </div>

                    <h3 className="winner-team-name">{c.team}</h3>
                    <div className="winner-lead">Lead: {c.winner}</div>

                    <div className="winner-highlight">
                      <Sparkles size={13} style={{ display: 'inline-block', marginRight: 6, verticalAlign: 'middle', color: c.color }} />
                      {c.highlight}
                    </div>

                    <div className="members-section-title">Team Roster</div>
                    <div className="members-list">
                      {c.members.map((m, idx) => (
                        <div key={idx} className="member-chip">
                          <span className="member-dot" style={{ backgroundColor: c.color }} />
                          <span>{m}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
