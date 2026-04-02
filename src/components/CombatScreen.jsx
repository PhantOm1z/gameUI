import './CombatScreen.css';

const Card = ({ name, cost, type, desc, keyword }) => (
  <div className="combat-card">
    <div className="card-cost">{cost}</div>
    <div className={`card-art ${type}`}></div>
    <div className="card-info">
      <div className="card-name">{name}</div>
      <div className="card-tags"><span className="tag">{keyword}</span></div>
      <div className="card-desc">{desc}</div>
    </div>
  </div>
);

export default function CombatScreen({ onExit }) {
  return (
    <div className="combat-screen">
      <header className="combat-header">
        <button className="back-btn" onClick={onExit}>⬅</button>
        <div className="wave-info">Wave 3/10</div>
        <div className="base-hp">❤️ 100/100</div>
      </header>

      <div className="combat-arena">
        {/* Simple lane representation */}
        <div className="lane">
           <div className="enemy slime"></div>
        </div>
        <div className="lane active">
           <div className="hero-avatar"></div>
           <div className="enemy goblin"></div>
        </div>
        <div className="lane"></div>
      </div>

      <div className="combat-ui">
        <div className="energy-indicator">
          <div className="energy-orb">
             <span className="current-energy">4</span>/10
          </div>
        </div>
        
        <div className="card-hand">
          <Card name="Fireball" cost="3" type="magic" desc="Deal 50 dmg" keyword="Burn" />
          <Card name="Shield Bash" cost="2" type="melee" desc="Stun enemy 1s" keyword="Stun" />
          <Card name="Heal" cost="4" type="holy" desc="Restore 30 HP" keyword="Heal" />
          <Card name="Strike" cost="1" type="melee" desc="Deal 15 dmg" keyword="Basic" />
        </div>
      </div>
    </div>
  );
}
