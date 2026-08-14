import React, { useEffect, useRef } from 'react';
import { Users, GraduationCap, Layers, Trophy } from 'lucide-react';

export default function Hero({ participantCount, collegeCount, trackCount, winnerCount }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 320;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#E11D48', '#7C3AED', '#D97706', '#0D9488', '#059669'];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.35 + 0.1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="hero-section">
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="ticker-banner">
        <div className="ticker-track">
          <span>👑 QUEENATHON 2026</span>
          <span>🩺 CYCLECARE AI</span>
          <span>🛒 MARKETLINK</span>
          <span>🤰 MATERNAL HEALTH</span>
          <span>🗺️ SAFEROUTE AI</span>
          <span>🚨 SMART SAFETY NETWORK</span>
          <span>⚡ INNOVATE · BUILD · REIGN</span>
          <span>🏆 HALL OF CHAMPIONS</span>
          <span>👑 QUEENATHON 2026</span>
          <span>🩺 CYCLECARE AI</span>
          <span>🛒 MARKETLINK</span>
          <span>🤰 MATERNAL HEALTH</span>
          <span>🗺️ SAFEROUTE AI</span>
          <span>🚨 SMART SAFETY NETWORK</span>
          <span>⚡ INNOVATE · BUILD · REIGN</span>
          <span>🏆 HALL OF CHAMPIONS</span>
        </div>
      </div>

      <span className="hero-crown-large">👑</span>
      <h1 className="hero-main-title">QUEENATHON</h1>
      <p className="hero-subtitle">Build · Break · Reign — Hackathon 2026</p>
      <p className="hero-org">Presented by Dhaanish Ahmed Institute of Technology</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#E11D48' }}>
            <Users size={20} />
            <div className="stat-number">{participantCount}</div>
          </div>
          <div className="stat-label">Participants</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#7C3AED' }}>
            <GraduationCap size={20} />
            <div className="stat-number">{collegeCount}+</div>
          </div>
          <div className="stat-label">Colleges</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#0D9488' }}>
            <Layers size={20} />
            <div className="stat-number">{trackCount}</div>
          </div>
          <div className="stat-label">Problem Tracks</div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#D97706' }}>
            <Trophy size={20} />
            <div className="stat-number">{winnerCount}</div>
          </div>
          <div className="stat-label">Winning Teams</div>
        </div>
      </div>
    </section>
  );
}
