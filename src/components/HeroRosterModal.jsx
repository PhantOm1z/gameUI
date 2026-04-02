import { useState } from 'react';
import './HeroRosterModal.css';

// Mock data
export const ALL_HEROES = [
  { id: 1, name: 'Ulric', class: 'Common', owned: true, power: 984, element: 'Fire' },
  { id: 2, name: 'Sylvia', class: 'Legendary', owned: true, power: 5037, element: 'Nature' },
  { id: 3, name: 'Kael', class: 'Epic', owned: false, power: 0, element: 'Water' },
  { id: 4, name: 'Brogni', class: 'Legendary', owned: true, power: 4200, element: 'Earth' },
  { id: 5, name: 'Fenax', class: 'Epic', owned: false, power: 0, element: 'Light' },
  { id: 6, name: 'Lydia', class: 'Mythic', owned: false, power: 0, element: 'Dark' },
  { id: 7, name: 'Gorgorab', class: 'Epic', owned: true, power: 3100, element: 'Dark' },
  { id: 8, name: 'Apothecary', class: 'Rare', owned: true, power: 1500, element: 'Light' },
];

export default function HeroRosterModal({ onClose, onSelectHero }) {
  const [showOwnedOnly, setShowOwnedOnly] = useState(false);

  const displayedHeroes = showOwnedOnly 
    ? ALL_HEROES.filter(h => h.owned) 
    : ALL_HEROES;

  return (
    <div className="popup-overlay roster-overlay">
      <div className="parchment-panel roster-panel">
        <header className="roster-header">
          <button className="back-btn" onClick={onClose}>⬅</button>
          <h2 className="roster-title">Hero Roster</h2>
          <div style={{ width: '32px' }}></div> {/* Spacer for centering */}
        </header>

        <div className="roster-filter">
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={showOwnedOnly} 
              onChange={(e) => setShowOwnedOnly(e.target.checked)} 
            />
            Show Owned Only
          </label>
        </div>

        <div className="roster-grid">
          {displayedHeroes.map(hero => (
            <div 
              key={hero.id} 
              className={`hero-card ${hero.owned ? 'owned' : 'unowned'}`}
              onClick={() => onSelectHero(hero)}
            >
              <div className="hero-card-art">
                {/* Placeholder for hero art */}
                <span className="element-icon">{hero.element === 'Fire' ? '🔥' : hero.element === 'Nature' ? '🌿' : hero.element === 'Water' ? '💧' : '✨'}</span>
              </div>
              <div className="hero-card-info">
                <span className="hero-card-name">{hero.name}</span>
                {!hero.owned && <span className="not-acquired">Not Acquired</span>}
              </div>
              <div className={`class-banner ${hero.class.toLowerCase()}`}>
                {hero.class}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
