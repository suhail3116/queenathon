import React, { useEffect } from 'react';
import { X, Building2, Users, BookOpen, Layers } from 'lucide-react';
import { PROBLEMS } from '../data/participants';

export default function ParticipantModal({ participant, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!participant) return null;

  const prob = PROBLEMS[participant.problem] || {};

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div className="modal-header-info">
          <div
            className="modal-avatar"
            style={{
              background: `linear-gradient(135deg, ${prob.color || '#FF2D78'}, #FFD600)`
            }}
          >
            {participant.initials}
          </div>

          <div>
            <span
              className="card-id-tag"
              style={{
                color: prob.color,
                borderColor: prob.color
              }}
            >
              {participant.id}
            </span>
            <h2 className="card-title-name" style={{ fontSize: '24px', marginTop: '6px' }}>
              {participant.name}
            </h2>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="modal-detail-row">
            <div className="modal-detail-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={14} /> Team Roster ({participant.namesArray.length} Member{participant.namesArray.length > 1 ? 's' : ''})
            </div>
            <div className="members-list" style={{ marginTop: '8px' }}>
              {participant.namesArray.map((name, idx) => (
                <div key={idx} className="member-chip" style={{ fontSize: '13px', padding: '6px 14px' }}>
                  <span className="member-dot" style={{ backgroundColor: prob.color || '#FF2D78' }} />
                  <span>{name}</span>
                  {idx === 0 && (
                    <span style={{ fontSize: '10px', color: prob.color || '#FF2D78', fontWeight: 700, marginLeft: 4 }}>
                      (Lead)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="modal-detail-row">
              <div className="modal-detail-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BookOpen size={14} /> Academic Standing
              </div>
              <div className="modal-detail-value" style={{ color: prob.color }}>{participant.year}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>{participant.dept}</div>
            </div>

            <div className="modal-detail-row">
              <div className="modal-detail-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Building2 size={14} /> Institution
              </div>
              <div className="modal-detail-value">{participant.college}</div>
            </div>
          </div>

          <div className="modal-detail-row">
            <div className="modal-detail-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={14} /> Assigned Problem Track
            </div>
            <div
              className="track-badge-pill"
              style={{
                color: prob.color,
                borderColor: prob.color,
                backgroundColor: `${prob.color}20`,
                marginTop: '6px',
                fontSize: '12px',
                padding: '8px 16px'
              }}
            >
              <span style={{ fontSize: '16px' }}>{prob.emoji}</span>
              <span style={{ fontWeight: 700 }}>{prob.label}</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '8px' }}>
              {prob.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
