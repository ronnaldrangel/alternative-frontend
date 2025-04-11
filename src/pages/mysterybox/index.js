import { useState, useEffect } from 'react';

const MysteryBox = () => {
  const [code, setCode] = useState('');
  const [step, setStep] = useState('input'); // 'input', 'animation', 'prize'
  const [prize, setPrize] = useState('');
  const [error, setError] = useState('');
  const [animationProgress, setAnimationProgress] = useState(0);

  // Lista de códigos válidos y sus premios
  const validCodes = {
    '123456': '¡Un iPhone 15!',
    'PREMIO2023': '¡Una PlayStation 5!',
    'GANADOR': '¡Viaje a París!',
    'REGALO': '¡Tarjeta de regalo de $100!',
    'MISTERIO': '¡Un set de auriculares premium!',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim() === '') {
      setError('Por favor ingresa un código');
      return;
    }

    if (validCodes[code]) {
      setError('');
      setPrize(validCodes[code]);
      setStep('animation');
      
      // Iniciar la animación
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        setAnimationProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep('prize');
          }, 500);
        }
      }, 30);
    } else {
      setError('Código inválido. Intenta de nuevo.');
    }
  };

  // Efecto para la animación de confeti cuando se muestra el premio
  useEffect(() => {
    if (step === 'prize') {
      // Aquí iría código adicional para efectos especiales al mostrar el premio
      // Por simplicidad, no lo implementamos completamente
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-indigo-800 mb-6">Caja Misteriosa</h1>
          
          {step === 'input' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Ingresa tu código secreto
                </label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ejemplo: 123456"
                />
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                ¡Descubrir Premio!
              </button>
            </form>
          )}

          {step === 'animation' && (
            <div className="py-10 flex flex-col items-center">
              <div className="relative w-40 h-40 mb-8">
                {/* Caja animada */}
                <div className={`absolute inset-0 transition-all duration-300 ease-out ${
                  animationProgress > 50 ? 'scale-110 opacity-90' : 'scale-100 opacity-100'
                }`}>
                  <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg flex items-center justify-center">
                    <div className={`transition-all duration-500 ${
                      animationProgress > 70 ? 'opacity-0' : 'opacity-100'
                    }`}>
                      <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a1 1 0 10-2 0v1H7zM9 11a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Efectos de brillo */}
                {animationProgress > 60 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full absolute">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute bg-white rounded-full opacity-0 animate-ping"
                          style={{
                            width: `${Math.random() * 10 + 5}px`,
                            height: `${Math.random() * 10 + 5}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 2 + 0.5}s`,
                            animationDelay: `${Math.random() * 0.5}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-200 ease-out" 
                  style={{ width: `${animationProgress}%` }}
                ></div>
              </div>
              <p className="mt-4 text-gray-700 font-medium">Descubriendo premio...</p>
            </div>
          )}

          {step === 'prize' && (
            <div className="py-8 flex flex-col items-center">
              <div className="w-full mb-6 relative">
                <div className="absolute inset-0 bg-yellow-300 opacity-20 rounded-full animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-xl shadow-lg text-center">
                  <h2 className="text-2xl font-bold mb-2">¡Felicidades!</h2>
                  <p className="text-3xl font-extrabold">{prize}</p>
                </div>
              </div>
              
              {/* Confeti animado */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute animate-confetti"
                    style={{
                      top: '-5%',
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 10 + 5}px`,
                      height: `${Math.random() * 10 + 10}px`,
                      background: `hsl(${Math.random() * 360}, 100%, 50%)`,
                      borderRadius: `${Math.random() > 0.5 ? '50%' : '0'}`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${Math.random() * 3 + 2}s`
                    }}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  setStep('input');
                  setCode('');
                  setPrize('');
                }}
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200"
              >
                Probar otro código
              </button>
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MysteryBox;