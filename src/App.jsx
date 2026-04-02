import { useState } from 'react';
import './App.css';
import HomeScreen from './components/HomeScreen';
import CharacterScreen from './components/CharacterScreen';
import CombatScreen from './components/CombatScreen';
import RewardsPopup from './components/RewardsPopup';
import ShopScreen from './components/ShopScreen';
import GrowthScreen from './components/GrowthScreen';

// Simple SVG Icons
const ShopIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>);
const EquipIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>);
const BaseIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);
const GrowthIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>);
const SummonIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>);

function App() {
  const [currentTab, setCurrentTab] = useState('base');
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
        {currentTab === 'shop' && <ShopScreen />}
        {currentTab === 'equip' && <CharacterScreen />}
        {currentTab === 'base' && <HomeScreen onOpenRewards={() => setShowRewards(true)} onStartCombat={() => setCurrentTab('combat')} />}
        {currentTab === 'growth' && <GrowthScreen />}
        {currentTab === 'summon' && <div className="placeholder-screen" style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}><h2>Summon (Coming Soon)</h2></div>}

        {currentTab === 'combat' && <CombatScreen onExit={() => setCurrentTab('base')} />}
      </main>

      <nav className="bottom-nav">
        <button className={`nav-btn ${currentTab === 'shop' ? 'active' : ''}`} onClick={() => setCurrentTab('shop')}>
          <ShopIcon /> <span>Shop</span>
        </button>
        <button className={`nav-btn ${currentTab === 'equip' ? 'active' : ''}`} onClick={() => setCurrentTab('equip')}>
          <EquipIcon /> <span>Equip</span>
        </button>
        <button className={`nav-btn ${currentTab === 'base' ? 'active' : ''}`} onClick={() => setCurrentTab('base')}>
          <BaseIcon /> <span>Base</span>
        </button>
        <button className={`nav-btn ${currentTab === 'growth' ? 'active' : ''}`} onClick={() => setCurrentTab('growth')}>
          <GrowthIcon /> <span>Growth</span>
        </button>
        <button className={`nav-btn ${currentTab === 'summon' ? 'active' : ''}`} onClick={() => setCurrentTab('summon')}>
          <SummonIcon /> <span>Summon</span>
        </button>
      </nav>

      {showRewards && <RewardsPopup onClose={() => setShowRewards(false)} />}
    </>
  );
}

export default App;
