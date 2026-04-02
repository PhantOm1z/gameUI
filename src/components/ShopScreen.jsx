import { useState } from 'react';
import './ShopScreen.css';

// Using the newly generated assets
import bgImage from '../assets/shop_bg.png';
import bannerChar from '../assets/shop_banner_char.png';
import chestBasic from '../assets/chest_basic.png';
import chestEpic from '../assets/chest_epic.png';
import diamondsSmall from '../assets/diamonds_small.png';
import diamondsLarge from '../assets/diamonds_large.png';

// Mock Data
const VOYAGER_BUNDLES = [
  { id: 1, name: "Starter Bundle", boxImage: chestBasic, items: [{icon: "💎", amt: 300}, {icon: "🔮", amt: 60}, {icon: "🎁", amt: 1}], limit: 1, hot: true, price: "£0.89" },
  { id: 2, name: "Epic Bundle", boxImage: chestEpic, items: [{icon: "💎", amt: 680}, {icon: "🔮", amt: 120}, {icon: "🎁", amt: 2}], limit: 1, hot: false, price: "£4.49" },
  { id: 3, name: "Knight's Bundle", boxImage: chestEpic, items: [{icon: "💎", amt: 1980}, {icon: "📜", amt: 40}, {icon: "⏳", amt: "6h"}], limit: 1, hot: true, price: "£12.99" },
  { id: 4, name: "Lord's Bundle", boxImage: chestBasic, items: [{icon: "💎", amt: 3280}, {icon: "📜", amt: 80}, {icon: "⏳", amt: "12h"}], limit: 1, hot: true, price: "£21.99" },
  { id: 5, name: "Heroic Bundle", boxImage: chestEpic, items: [{icon: "💎", amt: 6580}, {icon: "📜", amt: 60}, {icon: "👤", amt: "1x"}], limit: 1, hot: false, price: "£44.99" },
  { id: 6, name: "Mythic Bundle", boxImage: chestEpic, items: [{icon: "💎", amt: 12980}, {icon: "👤", amt: "2x"}, {icon: "⚔️", amt: "1x"}], limit: 1, hot: true, price: "£89.99" },
];

const LIMITED_OFFERS = [
  { id: 1, name: "Daily Free Pack", boxImage: chestBasic, items: [{icon: "💎", amt: 20}, {icon: "🎫", amt: 1}], limit: 1, price: "Free!", endsIn: "23:59:59", free: true },
  { id: 2, name: "Weekly Summon Box", boxImage: chestEpic, items: [{icon: "💎", amt: 300}, {icon: "📜", amt: 10}], limit: 2, price: "€ 4.99", endsIn: "6d 12h", free: false },
  { id: 3, name: "Monthly Ascended", boxImage: chestEpic, items: [{icon: "💎", amt: 1200}, {icon: "🌟", amt: 50}], limit: 1, price: "€ 14.99", endsIn: "28d 4h", free: false },
];

const DIAMONDS_PACKS = [
  { id: 1, name: "Handful of Diamonds", image: diamondsSmall, amt: "60", bonus: "+0", price: "€ 0.99" },
  { id: 2, name: "Pouch of Diamonds", image: diamondsSmall, amt: "300", bonus: "+30", price: "€ 4.99" },
  { id: 3, name: "Chest of Diamonds", image: diamondsLarge, amt: "680", bonus: "+68", price: "€ 9.99" },
  { id: 4, name: "Cart of Diamonds", image: diamondsLarge, amt: "1280", bonus: "+128", price: "€ 19.99" },
  { id: 5, name: "Wagon of Diamonds", image: diamondsLarge, amt: "3280", bonus: "+328", price: "€ 49.99" },
  { id: 6, name: "Treasury", image: diamondsLarge, amt: "6480", bonus: "+648", price: "€ 99.99", best: true },
];

export default function ShopScreen() {
  const [activeSubTab, setActiveSubTab] = useState('voyager'); // 'voyager' | 'limited' | 'diamonds'

  return (
    <div className="afk-shop-screen" style={{ backgroundImage: `url(${bgImage})` }}>
      
      {/* Top Header Mockup */}
      <div className="afk-top-resources">
        <div className="resource-pill">💎 1,150</div>
        <div className="resource-pill">🎫 0</div>
      </div>

      <div className="afk-shop-content">
        
        {/* VOYAGER'S SET TAB */}
        {activeSubTab === 'voyager' && (
          <div className="afk-scroll-view">
            <div className="afk-banner">
              <img src={bannerChar} alt="Valkyrie" className="banner-character-img" />
              <div className="banner-text-overlay">
                <h1 className="sparkle-title">✦ VOYAGER'S SET ✦</h1>
                <p className="timer-text">Ends In 10d 1h</p>
              </div>
            </div>

            <div className="afk-grid">
              {VOYAGER_BUNDLES.map(bundle => (
                <div key={bundle.id} className="afk-card">
                  {bundle.hot && <div className="afk-hot-ribbon">Hot!</div>}
                  <div className="afk-card-inner">
                    <img src={bundle.boxImage} alt="chest" className="chest-image" />
                    <div className="rewards-row">
                      {bundle.items.map((it, idx) => (
                        <div key={idx} className="reward-item">
                          <span className="r-icon">{it.icon}</span>
                          <span className="r-amt">{it.amt}</span>
                        </div>
                      ))}
                    </div>
                    <p className="limit-text">Limit: {bundle.limit}</p>
                    <button className="afk-price-btn">{bundle.price}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LIMITED OFFERS TAB */}
        {activeSubTab === 'limited' && (
          <div className="afk-scroll-view limited-view">
            <div className="afk-banner limited-banner">
              <div className="banner-text-overlay centered-overlay">
                <h1 className="sparkle-title gold-gradient">✦ LIMITED OFFERS ✦</h1>
                <p className="timer-text">Refreshes specific deals daily!</p>
              </div>
            </div>

            <div className="limited-list">
              {LIMITED_OFFERS.map(offer => (
                <div key={offer.id} className="limited-list-card">
                  <div className="llc-left">
                    <img src={offer.boxImage} alt="offer-chest" className="llc-chest-image" />
                    <div className="llc-timer">⏳ {offer.endsIn}</div>
                  </div>
                  
                  <div className="llc-right">
                    <h3 className="llc-title">{offer.name}</h3>
                    <div className="rewards-row llc-rewards">
                      {offer.items.map((it, idx) => (
                        <div key={idx} className="reward-item">
                          <span className="r-icon">{it.icon}</span>
                          <span className="r-amt">{it.amt}</span>
                        </div>
                      ))}
                    </div>
                    <div className="llc-bottom">
                      <p className="limit-text llc-limit">Limit: {offer.limit}</p>
                      <button className={`afk-price-btn llc-btn ${offer.free ? 'free-btn' : ''}`}>
                        {offer.price}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIAMONDS TAB */}
        {activeSubTab === 'diamonds' && (
          <div className="afk-scroll-view diamonds-view">
            <div className="afk-banner diamonds-banner">
              <div className="banner-text-overlay centered-overlay">
                <h1 className="sparkle-title blue-gradient">✦ GEMS & DIAMONDS ✦</h1>
                <p className="timer-text">The premium currency of the realm</p>
              </div>
            </div>

            <div className="afk-grid diamonds-grid">
              {DIAMONDS_PACKS.map(pack => (
                <div key={pack.id} className="afk-card diamond-card">
                  {pack.best && <div className="afk-hot-ribbon best-ribbon">Best!</div>}
                  <div className="afk-card-inner">
                    <h3 className="diamond-pack-title">{pack.name}</h3>
                    <img src={pack.image} alt="diamonds" className="diamond-image" />
                    
                    <div className="diamond-amt-box">
                      <span className="d-icon">💎</span>
                      <span className="d-amt">{pack.amt}</span>
                    </div>
                    {pack.bonus !== "+0" && (
                      <div className="diamond-bonus">{pack.bonus} Bonus!</div>
                    )}
                    
                    <button className="afk-price-btn diamond-btn">{pack.price}</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Padding for bottom UI */}
        <div style={{height: '180px'}}></div>
      </div>

      {/* Floating Center Sub-Navigation */}
      <div className="afk-sub-nav">
        <div className={`nav-arch ${activeSubTab === 'voyager' ? 'active' : ''}`} onClick={() => setActiveSubTab('voyager')}>
          <div className="arch-bg" style={{backgroundImage: `url(${bannerChar})`}}></div>
          <span className="arch-label">Voyager's<br/>Set</span>
        </div>
        <div className={`nav-arch ${activeSubTab === 'limited' ? 'active' : ''}`} onClick={() => setActiveSubTab('limited')}>
          <div className="arch-bg arch-dark" style={{backgroundImage: `url(${chestEpic})`, backgroundSize: '70%', backgroundRepeat: 'no-repeat'}}></div>
          <span className="arch-label">Limited<br/>Offers</span>
          <div className="red-notification"></div>
        </div>
        <div className={`nav-arch ${activeSubTab === 'diamonds' ? 'active' : ''}`} onClick={() => setActiveSubTab('diamonds')}>
          <div className="arch-bg arch-pale" style={{backgroundImage: `url(${diamondsLarge})`, backgroundSize: '80%', backgroundRepeat: 'no-repeat'}}></div>
          <span className="arch-label text-gold">Diamonds<br/>Shop</span>
        </div>
      </div>

    </div>
  );
}
