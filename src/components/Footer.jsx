import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="app-footer">
      <div className="footer-content-wrap">
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <ArrowUp size={14} style={{ display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }} />
          Back to Top
        </button>

        <div className="footer-brand">QUEENATHON 2026</div>

        <p className="footer-credits">
          &copy; 2026 Dhaanish Ahmed Institute of Technology · All Rights Reserved · 👑 Reign Supreme
        </p>
      </div>
    </footer>
  );
}
