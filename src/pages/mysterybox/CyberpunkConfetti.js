import React from 'react';

const CyberpunkConfetti = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" style={{ top: '-5%', height: '120vh' }}>
      {/* Confeti de colores - caída simple desde arriba */}
      {[...Array(150)].map((_, i) => (
        <div 
          key={`confetti-${i}`} 
          className="absolute animate-confetti"
          style={{
            top: `-${Math.random() * 5}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: `hsl(${Math.random() * 360}, 100%, ${70 + Math.random() * 20}%)`,
            opacity: 0.9,
            borderRadius: `${Math.random() > 0.5 ? '50%' : '0px'}`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default CyberpunkConfetti;