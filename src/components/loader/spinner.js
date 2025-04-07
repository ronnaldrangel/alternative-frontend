// components/SpinLoader.js
import React from 'react';

const SpinLoader = ({ 
  size = 'medium', 
  color = 'primary',
  text,
  speed = 'normal'
}) => {
  // Configuración de tamaños
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };
  
  // Configuración de colores
  const colorClasses = {
    primary: 'text-red-600',
    secondary: 'text-gray-600',
    white: 'text-white'
  };
  
  // Configuración de velocidades
  const speedClasses = {
    slow: 'animate-[spin_2s_linear_infinite]',
    normal: 'animate-[spin_1s_linear_infinite]',
    fast: 'animate-[spin_0.5s_linear_infinite]'
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" aria-label="Loading" role="status">
        <svg 
          className={`${sizeClasses[size]} ${colorClasses[color]} ${speedClasses[speed]}`}
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          ></circle>
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      {text && (
        <p className="mt-3 text-sm text-gray-500">{text}</p>
      )}
    </div>
  );
};

export default SpinLoader;