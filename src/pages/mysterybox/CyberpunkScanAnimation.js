import { useState, useEffect } from 'react';

const CyberpunkScanAnimation = ({ animationProgress = 0, onComplete }) => {
  return (
    <div className="py-10 flex flex-col items-center">
      <div className="relative w-40 h-40 mb-8">
        {/* Caja holográfica animada con vibración */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ease-out animate-vibrate ${
            animationProgress > 50 ? 'scale-110' : 'scale-100'
          }`}
          style={{
            animationDuration: '0.05s',
            animationTimingFunction: 'cubic-bezier(.36,.07,.19,.97)'
          }}
        >
          <div className="w-full h-full bg-gray-900 rounded-lg border border-cyan-500 shadow-lg flex items-center justify-center overflow-hidden">
            {/* Efectos holográficos en la caja */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-cyan-900 animate-pulse"></div>
              <div className="absolute inset-0" style={{ 
                backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }}></div>
            </div>
            
            {/* Icono central con vibración */}
            <div className={`relative z-10 transition-all duration-500 ${
              animationProgress > 70 ? 'opacity-0 scale-150' : 'opacity-100 scale-100'
            }`}>
              <svg className="w-16 h-16 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            
            {/* Escáner láser */}
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute h-0.5 w-full bg-cyan-400 shadow-lg"
                style={{ 
                  top: `${animationProgress}%`,
                  boxShadow: '0 0 10px 2px #00ffff',
                  transition: 'top 0.1s linear'
                }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Efectos de partículas al escanear */}
        {animationProgress > 20 && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="absolute bg-cyan-400 rounded-full"
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  top: `${animationProgress}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.7,
                  boxShadow: '0 0 3px #0ff',
                  transform: `translateY(${(Math.random() * 10) - 5}px)`,
                  transition: 'all 0.5s ease-out'
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Barra de progreso */}
      <div className="w-full bg-gray-800 rounded-full h-1.5 mb-1 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-200 ease-out relative overflow-hidden"
          style={{ 
            width: `${animationProgress}%`,
            background: 'linear-gradient(90deg, #06b6d4, #8b5cf6)'
          }}
        >
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1s infinite linear'
            }}
          ></div>
        </div>
      </div>
      
      {/* Porcentaje de escaneo */}
      <div className="w-full flex justify-between text-xs text-cyan-500 mb-6">
        <span>{animationProgress}%</span>
        <span>DESCIFRANDO...</span>
      </div>
      
      {/* Líneas de código simuladas */}
      <div className="w-full font-mono text-md space-y-0.5 text-left mb-4">
        <p className="text-green-500">&gt; Iniciando escaneo...</p>
        {animationProgress > 20 && <p className="text-cyan-400">&gt; Validando cifrado...</p>}
        {animationProgress > 40 && <p className="text-cyan-400">&gt; Buscando las mejores ofertas...</p>}
        {animationProgress > 60 && <p className="text-yellow-400">&gt; Oferta encontrada! Decodificando...</p>}
        {animationProgress > 80 && <p className="text-purple-400">&gt; Extrayendo datos de premio...</p>}
        {animationProgress > 95 && <p className="text-green-500">&gt; ¡Descifrado completo!</p>}
      </div>
    </div>
  );
};

export default CyberpunkScanAnimation;