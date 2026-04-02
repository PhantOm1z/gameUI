import { useState } from 'react';
import './CharacterScreen.css';
import heroImg from '../assets/hero.png';
import HeroRosterModal, { ALL_HEROES } from './HeroRosterModal';
import HeroDetailModal from './HeroDetailModal';

const EquipSlot = ({ label, level, rarityColor, icon }) => (
  <div className="equip-box">
    {label && <div className="equip-label">{label}</div>}
    <div className="equip-slot-square" style={rarityColor ? { borderColor: rarityColor } : {}}>
      <span className="icon">{icon}</span>
    </div>
    {level && <div className="equip-level">Lv.{level}</div>}
  </div>
);

const InventoryItem = ({ level, rarityColor, icon, selected }) => (
  <div className={`inventory-item ${selected ? 'selected' : ''}`} style={rarityColor ? { borderColor: rarityColor } : {}}>
    <span className="icon">{icon}</span>
    <div className="item-level">Lv.{level}</div>
  </div>
);

export default function CharacterScreen() {
  const [invTab, setInvTab] = useState('item');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedHero, setSelectedHero] = useState(null);
  const [activeHero, setActiveHero] = useState(ALL_HEROES[0]);

  const handleSelectHeroFromRoster = (hero) => {
    setSelectedHero(hero);
    setActiveModal('details');
  };

  const handleConfirmHero = (hero) => {
    setActiveHero(hero);
    setActiveModal(null);
  };

  return (
    <div className={`character-screen new-layout ${isExpanded ? 'inventory-expanded' : ''}`}>
      {/* Upper Panel: Hero & Equipped */}
      <div className="hero-overview-panel">
        <div className="hero-equipment-layout">
          <div className="side-slots left">
            <EquipSlot label="Helmet" level="30" rarityColor="#4ade80" icon="🛡️" />
            <EquipSlot label="Main Weapon" level="39" rarityColor="#fca5a5" icon="🗡️" />
            <EquipSlot label="Ring" level="30" rarityColor="#9ca3af" icon="💍" />
          </div>

          <div className="hero-center-display">
            <div style={{ fontSize: '14px', color: '#f4ecdf', fontWeight: 'bold', marginBottom: '8px', fontFamily: 'var(--font-heading)' }}>
              {activeHero.name}
            </div>
            <div className="preset-tabs">
              <span className="preset active">1</span>
              <span className="preset">2</span>
              <span className="preset">3</span>
              <span className="preset">4</span>
            </div>
            <img src={heroImg} alt="Hero" className="hero-model-small" />
            <button 
              className="fantasy-button small-btn" 
              style={{ padding: '2px 8px', fontSize: '10px', height: '24px' }}
              onClick={() => setActiveModal('roster')}
            >
              🔄 Change Hero
            </button>
          </div>

          <div className="side-slots right">
            <EquipSlot label="Others" level="22" rarityColor="#c084fc" icon="📜" />
            <EquipSlot label="Secondary" level="33" rarityColor="#4ade80" icon="🔮" />
            <EquipSlot label="Skin" />
          </div>
        </div>

        <div className="equipped-towers-section">
          <div className="section-title">Tower</div>
          <div className="tower-slots">
            <EquipSlot level="2" icon="🗼" />
            <EquipSlot level="3" icon="🏹" />
            <EquipSlot level="2" rarityColor="#c084fc" icon="🔮" />
            <EquipSlot level="2" icon="🔥" />
            <EquipSlot level="3" rarityColor="#4ade80" icon="⚡" />
          </div>
        </div>
      </div>

      {/* Lower Panel: Inventory */}
      <div className="inventory-section">
        <div className="inventory-header">
          <h3 className="inventory-title">Inventory</h3>
          <div className="inventory-actions">
            <button className="fantasy-button small-btn" style={{display: 'flex', alignItems: 'center', gap: '4px'}}><span>🔍</span> Search</button>
            <button className="fantasy-button small-btn">Filter</button>
            <button className="fantasy-button small-btn" onClick={() => setIsExpanded(!isExpanded)} title="Toggle Inventory Size">
              {isExpanded ? '🔽' : '🔼'}
            </button>
          </div>
        </div>

        <div className="inventory-grid-container inner">
          <div className="inventory-grid">
            {invTab === 'item' ? (
              <>
                {/* Simulated Inventory Grid */}
                <InventoryItem level="39" rarityColor="#fca5a5" icon="🗡️" selected />
                <InventoryItem level="36" rarityColor="#c084fc" icon="🪓" />
                <InventoryItem level="30" rarityColor="#c084fc" icon="⛏️" />
                <InventoryItem level="34" rarityColor="#fca5a5" icon="🪄" />
                <InventoryItem level="36" rarityColor="#a78b53" icon="🔨" />
                
                <InventoryItem level="18" rarityColor="#4ade80" icon="🛡️" />
                <InventoryItem level="40" rarityColor="#4ade80" icon="🗡️" />
                <InventoryItem level="23" rarityColor="#4ade80" icon="🪓" />
                <InventoryItem level="33" rarityColor="#4ade80" icon="🪄" />
                <InventoryItem level="16" rarityColor="#4ade80" icon="🛡️" />
                
                <InventoryItem level="30" rarityColor="#4ade80" icon="📜" />
                <InventoryItem level="19" rarityColor="#4ade80" icon="💍" />
                <InventoryItem level="28" rarityColor="#4ade80" icon="🔮" />
                <InventoryItem level="22" rarityColor="#4ade80" icon="👘" />
                <InventoryItem level="22" rarityColor="#fbbf24" icon="🗡️" />
                
                <InventoryItem level="10" rarityColor="#9ca3af" icon="🛡️" />
                <InventoryItem level="5" rarityColor="#9ca3af" icon="🗡️" />
                <InventoryItem level="7" rarityColor="#9ca3af" icon="🪓" />
                <InventoryItem level="2" rarityColor="#9ca3af" icon="🪄" />
                <InventoryItem level="1" rarityColor="#9ca3af" icon="🛡️" />
              </>
            ) : (
              <>
                <InventoryItem level="10" rarityColor="#9ca3af" icon="🗼" />
                <InventoryItem level="5" rarityColor="#4ade80" icon="🏹" />
                <InventoryItem level="7" rarityColor="#c084fc" icon="🔮" />
                <InventoryItem level="12" rarityColor="#fca5a5" icon="🔥" />
                <InventoryItem level="8" rarityColor="#a78b53" icon="⚡" />
              </>
            )}
            
          </div>
        </div>

        <div className="inventory-tabs">
          <button className={`inv-tab ${invTab === 'item' ? 'active' : ''}`} onClick={() => setInvTab('item')}>Item</button>
          <button className={`inv-tab ${invTab === 'tower' ? 'active' : ''}`} onClick={() => setInvTab('tower')}>Tower</button>
        </div>
      </div>

      {activeModal === 'roster' && (
        <HeroRosterModal 
          onClose={() => setActiveModal(null)} 
          onSelectHero={handleSelectHeroFromRoster} 
        />
      )}

      {activeModal === 'details' && (
        <HeroDetailModal 
          hero={selectedHero} 
          onConfirm={handleConfirmHero} 
          onCancel={() => setActiveModal('roster')} 
        />
      )}
    </div>
  );
}
