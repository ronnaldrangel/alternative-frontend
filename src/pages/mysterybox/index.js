import { useState, useEffect, useRef } from 'react';
import { LockClosedIcon, EnvelopeIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'sonner';
import Image from 'next/image';


// Componentes modulares
import CyberpunkScanAnimation from './CyberpunkScanAnimation';
import CyberpunkConfetti from './CyberpunkConfetti';
import CyberpunkPrize from './CyberpunkPrize';

// Constante para la duración exacta de la animación en milisegundos
const SCAN_DURATION_MS = 10000; // 30 segundos exactamente

// Usar variables de entorno para configuración (formato Next.js)
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_TICKET_URL || 'https://n8n-alternative.wazend.net/webhook-test/809523e8-ca1a-4df1-9936-4da175084d01';
const TICKET_PURCHASE_URL = process.env.NEXT_PUBLIC_TICKET_PURCHASE_URL || 'https://wa.link/3v3ts0';

const CyberpunkMysteryBox = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('input'); // 'input', 'animation', 'prize'
  const [prize, setPrize] = useState('');
  const [prizeName, setPrizeName] = useState('');
  const [prizes, setPrizes] = useState([]);
  const [error, setError] = useState('');
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Estado para controlar el temporizador de la animación
  const [scanStartTime, setScanStartTime] = useState(null);
  const [animationTimer, setAnimationTimer] = useState(null);

  // Referencia para el audio de escaneo
  const scanAudioRef = useRef(null);
  const confettiAudioRef = useRef(null);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos vacíos (validación mínima en el frontend)
    if (code.trim() === '') {
      setError('Por favor ingresa un código');
      toast.error('Por favor ingresa un código');
      return;
    }

    if (email.trim() === '') {
      setError('Por favor ingresa tu email');
      toast.error('Por favor ingresa tu email');
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor ingresa un email válido');
      toast.error('Por favor ingresa un email válido');
      return;
    }

    // Enviar datos al webhook para validación
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          code: code
        }),
      });

      const data = await response.json();

      if (data.error) {
        // Si el webhook responde con error, mostrar toast pero no iniciar el escaneo
        setError(data.message || 'Código inválido. Intenta de nuevo.');
        toast.error(data.message || 'Código inválido. Intenta de nuevo.');
        return;
      }

      // Limpiar cualquier error previo
      setError('');

      // Manejar diferentes formatos de respuesta para premios
      if (data.prizes && Array.isArray(data.prizes) && data.prizes.length > 0) {
        // Si recibimos un array de premios
        setPrizes(data.prizes);
      } else if (data.prize) {
        // Si recibimos un solo premio en formato tradicional
        setPrize(data.prize);
        setPrizeName(data.prizeName || '');
        // También lo convertimos al nuevo formato para compatibilidad
        setPrizes([{
          name: data.prize,
          description: data.prizeName || ''
        }]);
      } else {
        // Formato de respuesta inesperado, pero continuamos con un premio genérico
        setPrize('¡Premio misterioso!');
        setPrizes([{ name: '¡Premio misterioso!' }]);
      }

      // Iniciar la animación de escaneo
      startScanAnimation();
    } catch (error) {
      setError('Error de conexión. Intenta de nuevo más tarde.');
      toast.error('Error de conexión. Intenta de nuevo más tarde.');
    }
  };

  // Inicializar objetos de audio
  useEffect(() => {
    // Crear objetos de audio, pero sin reproducirlos aún
    scanAudioRef.current = new Audio('/scan-sound.mp3');
    scanAudioRef.current.loop = true;
    scanAudioRef.current.volume = 0.6;

    confettiAudioRef.current = new Audio('/confetti-sound.mp3');
    confettiAudioRef.current.volume = 0.5;

    // Limpiar al desmontar
    return () => {
      if (scanAudioRef.current) {
        scanAudioRef.current.pause();
        scanAudioRef.current.currentTime = 0;
      }
      if (confettiAudioRef.current) {
        confettiAudioRef.current.pause();
        confettiAudioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Función para iniciar la animación de escaneo con duración fija
  const startScanAnimation = () => {
    // Cambiar a la pantalla de animación
    setStep('animation');

    // Resetear el progreso
    setAnimationProgress(0);

    // Registrar el tiempo de inicio
    const startTime = Date.now();
    setScanStartTime(startTime);

    // Reproducir sonido de escaneo
    if (scanAudioRef.current) {
      scanAudioRef.current.currentTime = 0;
      scanAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }

    console.log(`Inicio de escaneo: ${new Date(startTime).toLocaleTimeString()}`);
    console.log(`Duración prevista: 30 segundos`);

    // Crear un array de 100 pasos para la animación (0% a 100%)
    const steps = Array.from({ length: 101 }, (_, i) => i);

    // Calcular el tiempo de inicio y fin para cada paso
    const animationPlan = steps.map(step => {
      // Cada paso debe ocurrir en un momento específico durante los 30 segundos
      const timeOffset = (step / 100) * SCAN_DURATION_MS;
      return {
        step,
        executeAt: startTime + timeOffset
      };
    });

    // Configurar temporizadores individuales para cada paso
    const timers = [];
    animationPlan.forEach(({ step, executeAt }) => {
      const timeoutId = setTimeout(() => {
        if (step <= 100) { // Verificación de seguridad
          setAnimationProgress(step);

          // Si es el último paso, mostrar el premio después de un breve retraso
          if (step === 100) {
            const endTime = Date.now();
            const actualDuration = (endTime - startTime) / 1000;
            console.log(`Fin de escaneo: ${new Date(endTime).toLocaleTimeString()}`);
            console.log(`Duración real: ${actualDuration.toFixed(2)} segundos`);

            // Detener sonido de escaneo
            if (scanAudioRef.current) {
              // Bajar volumen gradualmente
              const fadeOutInterval = setInterval(() => {
                if (scanAudioRef.current.volume > 0.05) {
                  scanAudioRef.current.volume -= 0.05;
                } else {
                  clearInterval(fadeOutInterval);
                  scanAudioRef.current.pause();
                  scanAudioRef.current.volume = 0.6; // Restaurar volumen original
                }
              }, 50);
            }

            setTimeout(() => setStep('prize'), 500);
          }
        }
      }, executeAt - startTime);

      timers.push(timeoutId);
    });

    // Almacenar los IDs de los temporizadores
    setAnimationTimer(timers);
  };

  // Función para manejar la compra de ticket
  const handleBuyTicket = () => {
    window.open(TICKET_PURCHASE_URL, '_blank');
  };

  // Limpiar temporizadores al desmontar o resetear
  useEffect(() => {
    return () => {
      if (animationTimer && animationTimer.length > 0) {
        animationTimer.forEach(id => clearTimeout(id));
      }
    };
  }, [animationTimer]);

  // Efecto para la animación de premio
  useEffect(() => {
    if (step === 'prize') {
      // Mostrar confeti
      setShowConfetti(true);

      // Reproducir sonido de celebración
      if (confettiAudioRef.current) {
        confettiAudioRef.current.currentTime = 0;
        confettiAudioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }

      // Ocultar el confeti después de 20 segundos
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [step]);

  // Efecto para detener el sonido de escaneo cuando se cambia de etapa
  useEffect(() => {
    if (step !== 'animation' && scanAudioRef.current) {
      scanAudioRef.current.pause();
      scanAudioRef.current.currentTime = 0;
    }
  }, [step]);

  // Función para volver al inicio
  const handleReset = () => {
    // Limpiar todos los temporizadores pendientes
    if (animationTimer && animationTimer.length > 0) {
      animationTimer.forEach(id => clearTimeout(id));
      setAnimationTimer(null);
    }

    // Detener sonidos si están reproduciéndose
    if (scanAudioRef.current) {
      scanAudioRef.current.pause();
      scanAudioRef.current.currentTime = 0;
    }

    // Resetear estados
    setStep('input');
    setCode('');
    setPrize('');
    setPrizeName('');
    setPrizes([]);
    setAnimationProgress(0);
    setShowConfetti(false);
    setScanStartTime(null);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/background.webp')" }} // Aquí se referencia la imagen dentro de la carpeta public
    >
      {/* Componente de confeti */}
      <CyberpunkConfetti show={showConfetti} />

      <div className="flex justify-center mb-6">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={128}  // Ajusta el tamaño según sea necesario
          height={128}  // Ajusta el tamaño según sea necesario
          className="object-contain"  // Asegura que la imagen mantenga su proporción
        />
      </div>

      {/* Contenedor principal */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative bg-gray-900 bg-opacity-80 backdrop-blur-sm rounded-xl border border-cyan-500 shadow-2xl overflow-hidden">
          {/* Detalles tecnológicos decorativos */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-cyan-500"></div>

          {/* Esquinas con detalle cyber */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400"></div>

          <div className="p-8">


            <div className="flex justify-center mb-10">
              <Image
                src="/textbox.png"
                alt="Logo"
                width={200}  // Ajusta el tamaño según sea necesario
                height={128}  // Ajusta el tamaño según sea necesario
                className="object-contain"  // Asegura que la imagen mantenga su proporción
              />
            </div>


            {/* <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6 tracking-wider">
              MYSTERY<span className="text-cyan-400">BOX</span>_
            </h1> */}

            {/* Sección de entrada de código */}
            {step === 'input' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campo de Email - Ahora primero */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-1 uppercase tracking-wider">
                    // Dirección de contacto
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 text-cyan-300 rounded-lg border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-cyan-700"
                      placeholder="usuario@dominio.com"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-cyan-500" />
                    </div>
                  </div>
                </div>

                {/* Campo de Código - Ahora segundo */}
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-cyan-400 mb-1 uppercase tracking-wider">
                    // Ingresa tu ticket
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 text-cyan-300 rounded-lg border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-cyan-700"
                      placeholder="XXXX-XXXX-XXXX"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-cyan-500" />
                    </div>
                  </div>

                  {/* Mensaje de error */}
                  {error && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {error}
                    </p>
                  )}
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10 uppercase tracking-wider">Canejar ahora</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></span>
                </button>

                {/* Botón de Comprar Ticket */}
                <button
                  type="button"
                  onClick={handleBuyTicket}
                  className="w-full mt-4 bg-gray-800 border border-cyan-500 hover:bg-gray-700 text-cyan-400 font-bold py-3 px-4 rounded-lg transition duration-200 relative overflow-hidden group"
                >
                  <span className="relative z-10 uppercase tracking-wider">Comprar Ticket</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity"></span>
                </button>
              </form>
            )}

            {/* Sección de animación de escaneo */}
            {step === 'animation' && (
              <div>
                <CyberpunkScanAnimation animationProgress={animationProgress} />

                {/* Información de depuración oculta */}
                <div className="hidden">
                  <p>Tiempo de inicio: {scanStartTime ? new Date(scanStartTime).toLocaleTimeString() : 'N/A'}</p>
                  <p>Duración planificada: 30 segundos</p>
                  <p>Tiempo transcurrido: {scanStartTime ? ((Date.now() - scanStartTime) / 1000).toFixed(1) : 0} segundos</p>
                </div>
              </div>
            )}

            {/* Sección del premio */}
            {step === 'prize' && (
              <CyberpunkPrize
                prizes={prizes}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </div>

      {/* Estilos para las animaciones */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes float {
          0% {
            transform: translateY(-10px);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh);
            opacity: 0;
          }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes vibrate {
          0% { transform: translate(0); }
          20% { transform: translate(-1px, 1px); }
          40% { transform: translate(-1px, -1px); }
          60% { transform: translate(1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0); }
        }
        
        .animate-vibrate {
          animation: vibrate 0.05s linear infinite;
        }
        
        .animate-confetti {
          animation: confetti 4s linear forwards;
        }
        
        .animate-float {
          animation: float 4s linear forwards;
        }
        
        /* Esconder el scrollbar para una experiencia más inmersiva */
        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CyberpunkMysteryBox;