import { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import CharacterScreen from './components/CharacterScreen';
import CombatScreen from './components/CombatScreen';
import RewardsPopup from './components/RewardsPopup';

// Simple SVG Icons
const HomeIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>);
const HeroIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>);
const CombatIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14.5 17.5L3 6V3h3l11.5 11.5"></path><path d="M19 19v3h-3L4.5 10.5"></path><path d="M13 19l6-6"></path></svg>);

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [showRewards, setShowRewards] = useState(false);

  return (
    <>
      <header className="top-bar">
        <div className="player-info">
          <div className="player-avatar"></div>
          <div className="player-stats">
            <span className="player-name">New Player</span>
            <span className="player-level">Lvl 6</span>
            <div className="power-bar"><div className="power-fill" style={{width: '60%'}}></div></div>
          </div>
        </div>
        <div className="resource-counters">
          <div className="resource gold">
            <span className="icon">💰</span>
            <span>45K</span>
          </div>
          <div className="resource gems">
            <span className="icon">💎</span>
            <span>1,150</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {currentTab === 'home' && <HomeScreen onOpenRewards={() => setShowRewards(true)} onStartCombat={() => setCurrentTab('combat')} />}
        {currentTab === 'hero' && <CharacterScreen />}
        {currentTab === 'combat' && <CombatScreen onExit={() => setCurrentTab('home')} />}
      </main>

      <nav className="bottom-nav">
        <button className={`nav-btn ${currentTab === 'home' ? 'active' : ''}`} onClick={() => setCurrentTab('home')}>
          <HomeIcon /> <span>Camp</span>
        </button>
        <button className={`nav-btn ${currentTab === 'hero' ? 'active' : ''}`} onClick={() => setCurrentTab('hero')}>
          <HeroIcon /> <span>Heroes</span>
        </button>
        <button className={`nav-btn ${currentTab === 'combat' ? 'active' : ''}`} onClick={() => setCurrentTab('combat')}>
          <CombatIcon /> <span>Brawl</span>
        </button>
      </nav>

      {showRewards && <RewardsPopup onClose={() => setShowRewards(false)} />}
    </>
  );
}

export default App;
