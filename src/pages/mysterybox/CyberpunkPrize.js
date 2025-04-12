import React from 'react';
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid';

const CyberpunkPrize = ({ prizes = [], onReset }) => {
  return (
    <div className="py-8 flex flex-col items-center">
      <div className="w-full mb-6 relative">
        {/* Fondo resplandeciente */}
        <div className="absolute inset-0 -m-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-lg opacity-70 blur-sm animate-pulse"></div>
        
        {/* Contenedor del premio */}
        <div className="relative bg-gray-900 text-white p-6 rounded-lg border border-cyan-500 shadow-lg text-center">
          {/* Efectos decorativos */}
          <div className="absolute top-0 right-0 w-12 h-12">
            <svg className="w-full h-full text-cyan-500 opacity-50" viewBox="0 0 100 100" fill="none">
              <circle cx="85" cy="15" r="1.5" fill="currentColor" />
              <circle cx="80" cy="10" r="1" fill="currentColor" />
              <circle cx="90" cy="10" r="1" fill="currentColor" />
              <path d="M90 20 L80 20 L80 30" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 left-0 w-12 h-12">
            <svg className="w-full h-full text-purple-500 opacity-50" viewBox="0 0 100 100" fill="none">
              <circle cx="15" cy="85" r="1.5" fill="currentColor" />
              <circle cx="10" cy="90" r="1" fill="currentColor" />
              <circle cx="20" cy="90" r="1" fill="currentColor" />
              <path d="M10 80 L20 80 L20 70" stroke="currentColor" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
          
          <h2 className="text-xl font-bold mb-3 text-cyan-400 uppercase tracking-wider">¡Código Aceptado!</h2>
          
          {/* Lista de premios */}
          <div className="space-y-4">
            {prizes.length > 0 ? (
              prizes.map((prize, index) => (
                <div key={index} className={`py-2 ${index < prizes.length - 1 ? 'border-b border-cyan-800' : ''}`}>
                  <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {prize.name}
                  </p>
                  {prize.description && (
                    <p className="mt-1 text-sm text-cyan-300">
                      {prize.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                ¡Premio misterioso!
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Botón para volver */}
      <button
        onClick={onReset}
        className="mt-8 bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-600 font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center space-x-2 group"
      >
        <ArrowLongLeftIcon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
        <span className="uppercase tracking-wider">Probar otro código</span>
      </button>
    </div>
  );
};

export default CyberpunkPrize;