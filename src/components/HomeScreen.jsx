import './HomeScreen.css';
import mapBg from '../assets/map_bg.png';

// Simple Icons
const QuestIcon = () => <span className="icon">📜</span>;
const EventIcon = () => <span className="icon">⚔️</span>;

export default function HomeScreen({ onOpenRewards, onStartCombat }) {
  return (
    <div className="home-screen">
      <div className="map-background" style={{ backgroundImage: `url(${mapBg})` }}>
        
        {/* Nodes overlaying the map (approximate positions via CSS for UI demonstration) */}
        <div className="map-path">
          <div className="node completed" style={{ bottom: '15%', left: '30%' }}>1</div>
          <div className="node completed" style={{ bottom: '25%', left: '50%' }}>2</div>
          <div className="node completed" style={{ bottom: '40%', left: '60%' }}>3</div>
          <div className="node active" style={{ bottom: '50%', left: '40%' }}>4
            <div className="node-pulse"></div>
            <div className="node-avatar-indicator">⚔️</div>
          </div>
          <div className="node locked" style={{ bottom: '65%', left: '50%' }}>5</div>
          <div className="node locked" style={{ bottom: '80%', left: '40%' }}>6</div>
        </div>

      </div>

      <div className="side-menu left">
        <button className="side-btn" onClick={onOpenRewards}>
          <div className="side-btn-icon"><QuestIcon /></div>
          <span>Quests</span>
        </button>
        <button className="side-btn">
          <div className="side-btn-icon"><EventIcon /></div>
          <span>Events</span>
        </button>
      </div>

      <div className="bottom-action-area">
        <button className="fantasy-button magic-glow start-btn" onClick={onStartCombat}>
          Fight
        </button>
      </div>

      <div className="vignette-overlay"></div>
    </div>
  );
}
