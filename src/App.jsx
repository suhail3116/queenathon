import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ParticipantsView from './components/ParticipantsView';
import WinnersView from './components/WinnersView';
import ParticipantModal from './components/ParticipantModal';
import Footer from './components/Footer';

import { PARTICIPANTS, UNIQUE_COLLEGES_COUNT, PROBLEMS } from './data/participants';
import { WINNERS_DATA } from './data/winners';

export default function App() {
  const [activeTab, setActiveTab] = useState('participants');
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const totalWinnersCount = WINNERS_DATA.reduce(
    (acc, domain) => acc + domain.cards.length,
    0
  );

  return (
    <div className="app-container">
      {/* Light Ambient Background Blobs */}
      <div className="bg-ambient">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
      </div>

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalParticipants={PARTICIPANTS.length}
        totalWinners={totalWinnersCount}
      />

      {/* Hero Banner with Stats & Ticker */}
      <Hero
        participantCount={PARTICIPANTS.length}
        collegeCount={UNIQUE_COLLEGES_COUNT}
        trackCount={Object.keys(PROBLEMS).length}
        winnerCount={totalWinnersCount}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, position: 'relative', zIndex: 2 }}>
        {activeTab === 'participants' ? (
          <ParticipantsView
            participants={PARTICIPANTS}
            onSelectParticipant={p => setSelectedParticipant(p)}
          />
        ) : (
          <WinnersView />
        )}
      </main>

      {/* Detail Modal */}
      {selectedParticipant && (
        <ParticipantModal
          participant={selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
