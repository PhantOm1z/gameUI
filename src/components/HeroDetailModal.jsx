import './HeroDetailModal.css';
import heroImg from '../assets/hero.png';

const SkillItem = ({ name, type, desc, icon }) => (
  <div className="skill-item">
    <div className="skill-icon">{icon}</div>
    <div className="skill-info">
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-type">{type}</span>
      </div>
      <div className="skill-desc">{desc}</div>
    </div>
  </div>
);

// Simple read-only equip slot for details
const DetailEquipSlot = ({ icon, rarityColor }) => (
  <div className="detail-equip-slot" style={rarityColor ? { borderColor: rarityColor } : {}}>
    <span className="icon">{icon}</span>
  </div>
);

export default function HeroDetailModal({ hero, onConfirm, onCancel }) {
  if (!hero) return null;

  const isOwned = hero.owned;

  return (
    <div className="popup-overlay detail-overlay">
      <div className="parchment-panel detail-panel">
        <header className="detail-header">
          <h2 className="detail-title">{hero.name}</h2>
          <span className={`class-badge ${hero.class.toLowerCase()}`}>{hero.class}</span>
        </header>

        <div className="detail-body">
          {/* Top part: Hero + Equip overview */}
          <div className="detail-hero-section">
            <div className="detail-side-slots">
              <DetailEquipSlot icon="🛡️" rarityColor="#4ade80" />
              <DetailEquipSlot icon="🗡️" rarityColor="#fca5a5" />
            </div>
            
            <div className="detail-hero-avatar">
              <img src={heroImg} alt={hero.name} />
              <div className="detail-power">✊ {hero.power > 0 ? hero.power : '???'}</div>
            </div>

            <div className="detail-side-slots">
              <DetailEquipSlot icon="📜" rarityColor="#c084fc" />
              <DetailEquipSlot icon="🔮" rarityColor="#4ade80" />
            </div>
          </div>

          {/* Bottom part: Skills */}
          <div className="detail-skills-section">
            <h3 className="section-title">Skills</h3>
            <div className="skills-list">
              <SkillItem 
                name="Primary Strike" 
                type="Basic Attack" 
                desc="Deals 100% ATK damage to a single enemy." 
                icon="⚔️" 
              />
              <SkillItem 
                name="Elemental Burst" 
                type="Active Skill" 
                desc={`Unleashes ${hero.element} energy, dealing 250% damage to all enemies.`} 
                icon={hero.element === 'Fire' ? '🔥' : hero.element === 'Nature' ? '🌿' : hero.element === 'Water' ? '💧' : '✨'} 
              />
              <SkillItem 
                name="Heroic Resolve" 
                type="Passive" 
                desc="Increases defense by 15% when HP drops below 50%." 
                icon="🛡️" 
              />
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="fantasy-button secondary" onClick={onCancel}>Cancel</button>
          <button 
            className={`fantasy-button magic-glow primary ${!isOwned ? 'disabled' : ''}`} 
            onClick={() => isOwned && onConfirm(hero)}
            disabled={!isOwned}
          >
            {isOwned ? 'Choose Hero' : 'Not Acquired'}
          </button>
        </div>
      </div>
    </div>
  );
}
