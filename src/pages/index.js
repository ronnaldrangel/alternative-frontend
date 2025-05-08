// pages/index.js
import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Head from 'next/head';

// Importamos los componentes y servicios con lazy loading
const ProductsSection = React.lazy(() => import('@/components/ProductsSection'));
const ContactForm = React.lazy(() => import('@/components/ContactForm'));

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-200 transition-colors duration-300">
      {/* Header con SEO */}
      <Head>
        <meta name="description" content="Las mejores ofertas en juegos y licencias hasta el 50% de descuento. Compra fácil y rápido" />
        <title>Alternative - Ofertas de Juegos y Licencias</title>
      </Head>

      <header className="bg-black text-white py-4 px-6 shadow-sm border-b border-zinc-800 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <Image
              src="https://landing-alternative.b-cdn.net/Logo%20Negativo.svg"
              alt="Alternative Logo"
              width={180}
              height={50}
              className="h-8 w-auto"
              priority // Asegura que el logo se cargue de inmediato
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Sección de productos optimizada con lazy loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProductsSection />
      </Suspense>

      {/* Sección de ofertas secundarias */}
      <div id="contact" className="py-12 bg-gradient-to-br from-black to-zinc-900">
        <div className="container mx-auto px-4 sm:px-6">
          {/* <div className="bg-zinc-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8 lg:p-10"> */}
          <div className="bg-zinc-900/70 rounded-2xl shadow-2xl border border-zinc-800 p-8 lg:p-10">

            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Quiero realizar la compra</h2>
              <div className="h-1 w-32 bg-red-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Rellena el formulario para que un asesor se comunique contigo y continúes con tu compra
              </p>
            </div>

            {/* Formulario de contacto optimizado */}
            <Suspense fallback={<div>Loading...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Footer optimizado */}
      <footer id="contacto" className="bg-black py-10 border-t border-zinc-900 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Image
                src="https://landing-alternative.b-cdn.net/Logo%20Negativo.svg"
                alt="Alternative Logo"
                width={140}
                height={35}
                className="h-8 w-auto"
                priority // Asegura que el logo del pie de página se cargue rápido
              />
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Alternative. Todos los derechos reservados.</p>

            {/* Disclaimers */}
            <div className="mt-3 mb-3 px-4 max-w-2xl">
              <p className="text-xs text-gray-500 mb-2">
                Todos los productos y licencias ofrecidos son originales y autorizados. No promovemos ni vendemos software pirata ni materiales incumpliendo derechos de autor.
              </p>
              <p className="text-xs text-gray-500">
                TikTok es una marca registrada de ByteDance. Este sitio no está afiliado, patrocinado ni avalado por TikTok.
              </p>
            </div>

            {/* Links de política de privacidad y términos y condiciones */}
            <div className="mt-4 flex space-x-6">
              <a
                href="/privacy-policy"
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors duration-300"
              >
                Política de Privacidad
              </a>
              <a
                href="/terms-and-conditions"
                className="text-sm text-gray-500 hover:text-gray-400 transition-colors duration-300"
              >
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
