import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

export default function Home() {
  // Función para manejar el redireccionamiento a WhatsApp
  const handleWhatsAppRedirect = () => {
    const waMessage = "🎶Hola Alternative🎉 quiero más información del catálogo🎮";
    const waPhone = "51935370706";
    
    // URL encodificada para WhatsApp
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(waMessage)}`;
    
    // Intenta abrir la app de WhatsApp directamente (funciona mejor en navegadores in-app como TikTok)
    window.location.href = waUrl;
  };

  // Efecto para detectar si viene de TikTok y optimizar comportamiento
  useEffect(() => {
    // Detectar el navegador in-app de TikTok mediante el user agent
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.indexOf('TikTok') > -1) {
      // Si detectamos TikTok, añadimos un listener para asegurar que el enlace funcione correctamente
      const whatsappLinks = document.querySelectorAll('.whatsapp-link');
      whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          handleWhatsAppRedirect();
        });
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center bg-gradient-to-b from-black to-black">
      {/* Header con logo */}
      <div className="absolute top-0 w-full p-4 flex justify-center">
        <img 
          src="https://minio.wazend.net/alternative/Logo_Negativo_618e271f81.svg" 
          alt="Alternative Logo" 
          className="h-8" 
        />
      </div>
      
      {/* Área de confirmación */}
      <div className="text-center mx-auto max-w-md w-full px-6">
        <div className="bg-black bg-opacity-90 p-8 rounded-xl shadow-2xl border border-red-900 bg-gradient-to-br from-black to-red-950">
          <div className="flex justify-center mb-6">
            <div className="bg-red-600 p-3 rounded-full">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4">¡Gracias por tu mensaje!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Un asesor se pondrá en contacto contigo a través de WhatsApp en breve.
          </p>
          
          <button 
            onClick={handleWhatsAppRedirect}
            className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg whatsapp-link"
          >
            Contactar por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}