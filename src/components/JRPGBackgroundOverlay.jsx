import { useMemo } from 'react';
import './JRPGBackgroundOverlay.css';

export default function JRPGBackgroundOverlay() {
  // Generate random particles only once
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: `${4 + Math.random() * 6}s`,
    delay: `${Math.random() * 5}s`,
    scale: 0.5 + Math.random(),
  })), []);

  return (
    <>
      <div className="magical-watermark"></div>
      <div className="diamond-dust-container">
        {particles.map(p => (
          <div 
            key={p.id} 
            className="dust-particle" 
            style={{ 
              left: p.left, 
              top: p.top, 
              animationDuration: p.duration,
              animationDelay: p.delay,
              '--scale': p.scale
            }} 
          />
        ))}
      </div>
    </>
  );
}
