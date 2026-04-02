import './CharacterScreen.css';
import heroImg from '../assets/hero.png';

const Slot = ({ type, locked, icon }) => (
  <div className={`equip-slot ${locked ? 'locked' : ''}`}>
    {locked ? <span className="icon">🔒</span> : <span>{icon}</span>}
    {!locked && <div className="slot-type">{type}</div>}
  </div>
);

export default function CharacterScreen() {
  return (
    <div className="character-screen">
      <div className="character-header">
        <h2 className="character-class text-gold">Common</h2>
        <h1 className="character-name">Ulric</h1>
      </div>

      <div className="character-stage">
        
        <div className="slots left-slots">
          <Slot type="Weapon" icon="🗡️" />
          <Slot type="Helmet" icon="🛡️" />
          <Slot type="Artifact" locked />
        </div>

        <div className="hero-display">
          <img src={heroImg} alt="Hero" className="hero-model" />
          {/* Subtle floor glow */}
          <div className="floor-glow"></div>
        </div>

        <div className="slots right-slots">
          <Slot type="Armor" icon="👕" />
          <Slot type="Boots" icon="👢" />
          <Slot type="Artifact" locked />
        </div>

      </div>

      <div className="stats-panel parchment-panel">
        <div className="power-score">
          <span className="power-icon">✊</span> <span className="text-gold">984</span>
        </div>
        <div className="stats-grid">
          <div className="stat"><span>❤️</span> 1091</div>
          <div className="stat"><span>⚔️</span> 78</div>
          <div className="stat"><span>🛡️</span> 20</div>
        </div>
      </div>

      <div className="character-actions">
        <button className="fantasy-button secondary">Auto Equip</button>
        <button className="fantasy-button magic-glow primary">Level Up</button>
      </div>
    </div>
  );
}
