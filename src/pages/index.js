// pages/index.js
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
// Importamos los componentes y servicios
import ProductsSection from '@/components/ProductsSection';
import ContactForm from '@/components/ContactForm';
import { toast } from 'sonner';

export default function Home() {
  // Estado para controlar la animación de carga
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Efecto para manejar el montaje del componente
  useEffect(() => {
    // Simulamos un tiempo de carga para la animación
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 200);
  }, []);

  return (
    <div className={`min-h-screen bg-black text-gray-200 transition-colors duration-300 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header - Mejorado con navegación */}
      <header className="bg-black text-white py-4 px-6 shadow-sm border-b border-zinc-800 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <Image
              src="https://minio.wazend.net/alternative/Logo_Negativo_618e271f81.svg"
              alt="Alternative Logo"
              width={180}
              height={50}
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Hero Section - Mejorado con gradientes y animaciones */}
      <section className="relative py-10 md:py-20 overflow-hidden bg-gradient-to-br from-zinc-900 to-black transition-all duration-300">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute -top-[40%] -right-[30%] w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
          <div className="absolute top-[60%] -left-[10%] w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-2xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Las mejores ofertas en juegos y licencias
            </h1>
            <span className="bg-red-600 text-white px-3 py-1 rounded-md">Productos hasta el 50% DESCUENTO</span>
          </div>
        </div>
      </section>

      {/* Sección de Productos - Ahora como un componente separado */}
      <ProductsSection />
      

      {/* Secondary Offers Section - Con diseño mejorado */}
      <section id="contact" className="py-12 sm:py-16 bg-gradient-to-br from-black to-zinc-900 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-zinc-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8 lg:p-10">

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Aprovecha nuestras ofertas</h2>
              <div className="h-1 w-32 bg-red-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Realiza tu compra de forma instantánea y recibe tus licencias en menos de 30 minutos. Soporte técnico disponible 24/7.
              </p>
            </div>

            {/* Componente de formulario separado */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer - Rediseñado */}
      <footer id="contacto" className="bg-black py-10 border-t border-zinc-900 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Image
                src="https://minio.wazend.net/alternative/Logo_Negativo_618e271f81.svg"
                alt="Alternative Logo"
                width={140}
                height={35}
                className="h-8 w-auto"
              />
            </div>

            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Alternative. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CSS para animaciones */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}