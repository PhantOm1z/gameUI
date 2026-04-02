import { useState } from 'react';
import './ShopScreen.css';

// Mock Data
const VOYAGER_BUNDLES = [
  { id: 1, name: "Starter Bundle", boxImage: "📦", items: ["💎 x300", "🔮 x60", "🎟️ x1"], limit: 1, hot: true, price: "£0.89" },
  { id: 2, name: "Advanced Bundle", boxImage: "🎁", items: ["💎 x680", "🔮 x120", "🎟️ x2"], limit: 1, hot: false, price: "£4.49" },
  { id: 3, name: "Master Bundle", boxImage: "👑", items: ["💎 x1980", "📜 x40", "⏳ 6h"], limit: 1, hot: true, price: "£12.99" },
  { id: 4, name: "Grand Bundle", boxImage: "💎", items: ["💎 x3280", "📜 x80", "⏳ 12h"], limit: 1, hot: true, price: "£21.99" },
  { id: 5, name: "Heroic Bundle", boxImage: "🦸", items: ["💎 x6580", "📜 x60", "👤 1x"], limit: 1, hot: false, price: "£44.99" },
  { id: 6, name: "Mythic Bundle", boxImage: "🗡️", items: ["💎 x12980", "👤 2x", "⚔️ 1x"], limit: 1, hot: true, price: "£89.99" },
];

const LIMITED_OFFERS = [
  { id: 1, boxImage: "🎁", items: ["💎 x300", "🎟️ x2"], limit: 1, price: "Free", endsIn: "31:07:12" },
  { id: 2, boxImage: "📦", items: ["💎 x300", "📜 x20"], limit: 2, price: "£4.49", endsIn: "31:07:12" },
  { id: 3, boxImage: "👑", items: ["💎 x680", "📜 x20", "⏳ 6h"], limit: 2, price: "£8.99", endsIn: "31:07:12" },
];

export default function ShopScreen() {
  const [activeSubTab, setActiveSubTab] = useState('voyager'); // 'voyager' | 'limited' | 'advancement'
  const [activeCategory, setActiveCategory] = useState('merchant'); // 'visiting' | 'merchant' | 'monthly'

  return (
    <div className="shop-screen">
      {/* Scrollable Main Area */}
      <div className="shop-content-area">
        
        {activeSubTab === 'voyager' && (
          <>
            <div className="shop-banner voyager-banner">
              <h2 className="banner-title">Voyager's Set</h2>
              <p className="banner-timer">Ends In 10d 1h</p>
            </div>
            <div className="shop-grid">
              {VOYAGER_BUNDLES.map(bundle => (
                <div key={bundle.id} className="shop-card grid-card">
                  {bundle.hot && <div className="hot-ribbon">Hot!</div>}
                  <div className="card-image-area">
                    <span className="box-icon">{bundle.boxImage}</span>
                  </div>
                  <div className="card-rewards">
                    {bundle.items.map((item, i) => (
                      <div key={i} className="reward-slot">{item}</div>
                    ))}
                  </div>
                  <div className="card-limit">Limit: {bundle.limit}</div>
                  <button className="fantasy-button price-btn">{bundle.price}</button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSubTab === 'limited' && (
          <>
            <div className="shop-banner limited-banner">
              <h2 className="banner-title text-gold">Limited Offers</h2>
            </div>
            <div className="shop-list">
              {LIMITED_OFFERS.map(offer => (
                <div key={offer.id} className="shop-card list-card">
                  <div className="list-left">
                    <span className="box-icon-large">{offer.boxImage}</span>
                    <span className="list-timer">Ends In: {offer.endsIn}</span>
                  </div>
                  <div className="list-right">
                    <div className="card-rewards">
                      {offer.items.map((item, i) => (
                        <div key={i} className="reward-slot">{item}</div>
                      ))}
                    </div>
                    <div className="card-limit">Limit: {offer.limit}</div>
                    <button className="fantasy-button price-btn">{offer.price}</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeSubTab === 'advancement' && (
          <div className="placeholder-content">
            <h2>Advancement Rewards</h2>
            <p>Unlock milestones to claim!</p>
          </div>
        )}

        {/* Padding so floating nav doesn't cover last items */}
        <div className="scroll-spacer"></div>
      </div>

      {/* Floating Center Sub-Navigation */}
      <div className="shop-sub-nav">
        <div className={`sub-nav-item ${activeSubTab === 'voyager' ? 'active' : ''}`} onClick={() => setActiveSubTab('voyager')}>
          <div className="sub-nav-portrait bg-red">🦸‍♀️</div>
          <span>Voyager's Set</span>
        </div>
        <div className={`sub-nav-item ${activeSubTab === 'limited' ? 'active' : ''}`} onClick={() => setActiveSubTab('limited')}>
          <div className="sub-nav-portrait bg-dark">🦇</div>
          <span>Limited Offers</span>
          <div className="red-dot"></div>
        </div>
        <div className={`sub-nav-item ${activeSubTab === 'advancement' ? 'active' : ''}`} onClick={() => setActiveSubTab('advancement')}>
          <div className="sub-nav-portrait bg-light">🧝‍♀️</div>
          <span>Advancement<br/>Rewards</span>
        </div>
      </div>

      {/* Bottom Categories (Sit right above global App.jsx nav) */}
      <div className="shop-categories">
        <div className={`shop-cat-btn ${activeCategory === 'visiting' ? 'active' : ''}`} onClick={() => setActiveCategory('visiting')}>
          <div className="cat-icon">⛵</div>
          <span className="cat-label">Visiting<br/>Merchants</span>
        </div>
        <div className={`shop-cat-btn ${activeCategory === 'merchant' ? 'active' : ''}`} onClick={() => setActiveCategory('merchant')}>
          <div className="cat-icon highlight">🚢</div>
          <span className="cat-label">Merchant<br/>Ship</span>
        </div>
        <div className={`shop-cat-btn ${activeCategory === 'monthly' ? 'active' : ''}`} onClick={() => setActiveCategory('monthly')}>
          <div className="cat-icon">🏰</div>
          <span className="cat-label">Monthly<br/>Card</span>
          <div className="red-dot"></div>
        </div>
      </div>
    </div>
  );
}
