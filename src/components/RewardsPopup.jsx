import './RewardsPopup.css';

const RewardItem = ({ icon, amount, type }) => (
  <div className="reward-item">
    <div className="reward-icon">{icon}</div>
    <div className="reward-amount">{amount}</div>
    <div className="reward-type">{type}</div>
  </div>
);

export default function RewardsPopup({ onClose }) {
  return (
    <div className="popup-overlay">
      <div className="parchment-panel popup-panel">
        <h2 className="popup-title">Victory Rewards</h2>
        
        <div className="rewards-grid">
          <RewardItem icon="💰" amount="500" type="Gold" />
          <RewardItem icon="✨" amount="120" type="EXP" />
          <RewardItem icon="💎" amount="10" type="Gems" />
          <RewardItem icon="🛡️" amount="1" type="Iron Shield" />
        </div>

        <div className="popup-actions">
          <button className="fantasy-button magic-glow collect-btn" onClick={onClose}>
            Collect
          </button>
        </div>

        {/* Sparkle effects overlay */}
        <div className="sparkles"></div>
      </div>
    </div>
  );
}
