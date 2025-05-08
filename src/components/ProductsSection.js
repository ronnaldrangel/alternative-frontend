// components/ProductsSection.js
import React, { useRef, useEffect, useState } from 'react';
import { useStrapiData } from '@/services/strapiService';
import { ShoppingCartIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import SpinLoader from '@/components/loader/spinner';

const ProductCard = ({ product, index }) => (
  <div
    className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-zinc-900 border border-zinc-800 rounded-2xl group flex flex-col h-[460px] snap-center min-w-[280px] w-full sm:w-auto"
    style={{
      animationDelay: `${index * 0.1}s`,
      opacity: 0,
      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
    }}
  >
    {/* La imagen ocupa el 50% de altura fija */}
    <div className="h-[230px] relative overflow-hidden bg-zinc-950 rounded-t-2xl">
      {product.img && product.img.url ? (
        <Image
          src={product.img.url}
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-zinc-900">
          <span className="text-gray-500">Sin imagen</span>
        </div>
      )}
    </div>
    <div className="flex flex-col p-5 h-[230px] flex-grow justify-between">
      <div>
        <h3 className="font-semibold text-lg mb-2 text-white">{product.name}</h3>
        <div className="flex items-baseline space-x-3">
          <span className="line-through text-gray-500 text-sm">S/.{product.regularPrice}</span>
          <span className="text-2xl font-bold text-green-500">S/.{product.salePrice}</span>
        </div>
      </div>
      <div className="w-full mt-3">
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-600/30 transition-all duration-300 rounded-full py-3 font-semibold flex items-center justify-center z-10"
          onClick={() => window.location.href = '#contact'}
        >
          <ShoppingCartIcon className="w-5 h-5 mr-2" />
          Comprar Ahora
        </button>
      </div>
    </div>
  </div>
);

const ErrorDisplay = ({ error }) => (
  <div className="col-span-full text-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800 shadow">
    <div className="flex flex-col items-center">
      <HeartIcon className="h-12 w-12 text-red-600 mb-4" />
      <h2 className="text-2xl font-bold mb-3 text-white">Error al cargar los productos</h2>
      <p className="text-gray-300">{error.message || "No se pudieron cargar los datos. Intenta de nuevo más tarde."}</p>
      <div className="mt-6">
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-500/20"
        >
          Intentar nuevamente
        </button>
      </div>
    </div>
  </div>
);

const EmptyProducts = () => (
  <div className="col-span-full text-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800 shadow">
    <div className="flex flex-col items-center">
      <ShoppingCartIcon className="h-16 w-16 text-gray-600 mb-4" />
      <p className="text-xl text-gray-300 font-medium">No hay productos disponibles en este momento.</p>
      <p className="text-gray-400 mt-2">Vuelve a revisar pronto para encontrar nuevas ofertas.</p>
    </div>
  </div>
);

const ProductsSection = () => {
  const { data: products, error, isLoading } = useStrapiData('products?populate=*');
  const sliderRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil (menos de sm breakpoint)
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Eliminamos los console.log de producción
  // Solo se mantienen durante desarrollo con un condicional
  if (process.env.NODE_ENV === 'development') {
    console.log('Data:', products);
    console.log('Error:', error);
    console.log('Loading:', isLoading);
  }

  const renderMobileContent = () => {
    if (isLoading) {
      return (
        <div className="w-full text-center py-12">
          <SpinLoader size="large" color="primary" text="Cargando ofertas..." speed="normal" />
        </div>
      );
    }

    if (error) {
      return <ErrorDisplay error={error} />;
    }

    if (!products || products.length === 0) {
      return <EmptyProducts />;
    }

    const scroll = (direction) => {
      if (sliderRef.current) {
        const { scrollLeft, clientWidth } = sliderRef.current;
        const scrollTo = direction === 'left'
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;

        sliderRef.current.scrollTo({
          left: scrollTo,
          behavior: 'smooth'
        });
      }
    };

    return (
      <div className="relative mb-6">
        {/* Indicador de desplazamiento horizontal */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center text-gray-400 text-sm">
            <ChevronLeftIcon className="w-4 h-4 animate-pulse" />
            <span className="mx-1">Desliza para ver más</span>
            <ChevronRightIcon className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Contenedor de scroll horizontal para móvil */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 gap-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Botones de navegación para móvil */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-zinc-800/80 p-1.5 rounded-full text-white z-10 -ml-2 shadow-lg"
          aria-label="Anterior"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-zinc-800/80 p-1.5 rounded-full text-white z-10 -mr-2 shadow-lg"
          aria-label="Siguiente"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Indicadores de puntos */}
        <div className="flex justify-center mt-4 space-x-2">
          {products.slice(0, Math.min(5, products.length)).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === 0 ? 'bg-green-500' : 'bg-zinc-600'}`}
            />
          ))}
          {products.length > 5 && <div className="text-zinc-500 text-xs"></div>}
        </div>
      </div>
    );
  };

  const renderDesktopContent = () => {
    if (isLoading) {
      return (
        <div className="col-span-full">
          <SpinLoader size="large" color="primary" text="Cargando ofertas..." speed="normal" />
        </div>
      );
    }

    if (error) {
      return <ErrorDisplay error={error} />;
    }

    if (!products || products.length === 0) {
      return <EmptyProducts />;
    }

    return products.map((product, index) => (
      <ProductCard key={product.id} product={product} index={index} />
    ));
  };

  return (
    <section id="productos" className="pt-10 pb-2 bg-zinc-950 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl md:text-3xl font-bold text-white">Productos Destacados</h2>
        </div>

        {/* Versión móvil (slider) */}
        <div className="sm:hidden">
          {renderMobileContent()}
        </div>

        {/* Versión desktop (grid) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {renderDesktopContent()}
        </div>
      </div>

      {/* Estilo para ocultar la barra de desplazamiento */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
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
    </section>
  );
};

export default ProductsSection;