import React, { useState, useMemo } from 'react';
import { Search, X, Download, Building2, Layers } from 'lucide-react';
import { PROBLEMS } from '../data/participants';

export default function ParticipantsView({ participants, onSelectParticipant }) {
  const [selectedTrack, setSelectedTrack] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('id-asc');

  // Calculate track counts
  const trackCounts = useMemo(() => {
    const counts = { all: participants.length };
    Object.keys(PROBLEMS).forEach(key => {
      counts[key] = participants.filter(p => p.problem === key).length;
    });
    return counts;
  }, [participants]);

  // Filter and sort participants
  const filteredParticipants = useMemo(() => {
    let result = [...participants];

    if (selectedTrack !== 'all') {
      result = result.filter(p => p.problem === selectedTrack);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.college.toLowerCase().includes(q) ||
          p.dept.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          PROBLEMS[p.problem]?.label.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.leadName.localeCompare(b.leadName));
    } else if (sortBy === 'college-asc') {
      result.sort((a, b) => a.college.localeCompare(b.college));
    } else {
      // id-asc
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [participants, selectedTrack, searchQuery, sortBy]);

  // Handle CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Lead Name / Members', 'Year', 'Department', 'College', 'Problem Track'];
    const rows = filteredParticipants.map(p => [
      `"${p.id}"`,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.year}"`,
      `"${p.dept.replace(/"/g, '""')}"`,
      `"${p.college.replace(/"/g, '""')}"`,
      `"${PROBLEMS[p.problem]?.label || p.problem}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `queenathon_participants_${selectedTrack}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="controls-section">
      {/* Filter Track Pills */}
      <div className="filter-pills-row">
        <button
          className={`filter-pill ${selectedTrack === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTrack('all')}
          style={
            selectedTrack === 'all'
              ? {
                  backgroundColor: '#FF2D78',
                  borderColor: '#FF2D78',
                  color: '#FFF',
                  boxShadow: '0 0 25px rgba(255, 45, 120, 0.5)'
                }
              : {}
          }
        >
          <Layers size={14} />
          <span>All Participants</span>
          <span className="filter-count">{trackCounts.all}</span>
        </button>

        {Object.entries(PROBLEMS).map(([key, prob]) => {
          const isActive = selectedTrack === key;
          const isDarkText = key === 'MarketLink' || key === 'Maternal' || key === 'SafetyNetwork';
          return (
            <button
              key={key}
              className={`filter-pill ${isActive ? 'active' : ''}`}
              onClick={() => setSelectedTrack(key)}
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
              <span
                className="filter-count"
                style={isActive ? { backgroundColor: isDarkText ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.25)', color: 'inherit' } : {}}
              >
                {trackCounts[key]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toolbar: Search, Sort, Export */}
      <div className="toolbar-wrap">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search by name, college, department, ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <div className="action-buttons">
          <select
            className="select-dropdown"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="id-asc">Sort by ID (DH001...)</option>
            <option value="name-asc">Sort by Lead Name (A-Z)</option>
            <option value="college-asc">Sort by College (A-Z)</option>
          </select>

          <button className="btn-secondary" onClick={handleExportCSV}>
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Count Info Bar */}
      <div className="results-info-bar">
        Showing {filteredParticipants.length} of {participants.length} participants
        {selectedTrack !== 'all' && ` in ${PROBLEMS[selectedTrack]?.label}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </div>

      {/* Cards Grid */}
      {filteredParticipants.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'Space Mono' }}>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No participants found 👑</p>
          <p style={{ fontSize: '13px' }}>Try adjusting your search query or filter track</p>
        </div>
      ) : (
        <div className="participants-grid">
          {filteredParticipants.map(p => {
            const prob = PROBLEMS[p.problem] || {};
            return (
              <div
                key={p.id}
                className="participant-card"
                onClick={() => onSelectParticipant(p)}
                style={{
                  '--card-accent-color': prob.color || '#FF2D78'
                }}
              >
                <div className="card-top-row">
                  <span className="card-id-tag">{p.id}</span>
                  {p.teamSize > 1 && (
                    <span className="team-badge">{p.teamSize} Members</span>
                  )}
                </div>

                <div className="avatar-wrapper">
                  <div className="avatar-inner">{p.initials}</div>
                </div>

                <h3 className="card-title-name">{p.name}</h3>
                <div className="card-year-dept">
                  <span style={{ color: prob.color }}>{p.year}</span> • {p.dept}
                </div>

                <div className="card-college">
                  <Building2 size={15} className="college-icon" />
                  <span>{p.college}</span>
                </div>

                <div
                  className="track-badge-pill"
                  style={{
                    color: prob.color,
                    borderColor: prob.color,
                    backgroundColor: `${prob.color}18`
                  }}
                >
                  <span>{prob.emoji}</span>
                  <span>{prob.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
