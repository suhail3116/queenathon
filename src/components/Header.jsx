import React from 'react';
import { Crown, Users, Trophy } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, totalParticipants, totalWinners }) {
  return (
    <header className="top-header">
      <div className="header-inner">
        <div className="brand-title-wrap" onClick={() => setActiveTab('participants')}>
          <span className="brand-crown">👑</span>
          <span className="brand-text">QUEENATHON</span>
          <span className="brand-year">2026</span>
        </div>

        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'participants' ? 'active' : ''}`}
            onClick={() => setActiveTab('participants')}
          >
            <Users size={16} />
            <span>Participants</span>
            <span className="badge-count">{totalParticipants}</span>
          </button>

          <button
            className={`nav-tab-btn ${activeTab === 'winners' ? 'active' : ''}`}
            onClick={() => setActiveTab('winners')}
          >
            <Trophy size={16} />
            <span>Hall of Champions</span>
            <span className="badge-count">{totalWinners}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
