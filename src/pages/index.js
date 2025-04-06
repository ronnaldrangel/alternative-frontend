// pages/index.js
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Importamos Heroicons v2
import {
  ArrowRightIcon,
  ShoppingCartIcon,
  SparklesIcon,
  PhoneIcon,
  UserIcon,
  EnvelopeIcon,
  MapPinIcon,
  HeartIcon
} from "@heroicons/react/24/solid";
import Image from "next/image";
// Importamos nuestro servicio de Strapi
import { useStrapiData } from '@/services/strapiService';
import Loader from '@/components/loader/skeleton';
// Componentes para el formulario
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

  // Obtenemos los productos desde Strapi
  const { data: products, error, isLoading } = useStrapiData('products?populate=*');

  console.log('Data:', products);

  // Definimos el esquema de validación con Zod
  const formSchema = z.object({
    nombre: z.string().min(2, {
      message: "El nombre debe tener al menos 2 caracteres.",
    }),
    telefono: z.string().length(9, {
      message: "El número de teléfono debe tener exactamente 9 dígitos.",
    }).regex(/^[0-9]{9}$/, {
      message: "Introduce un número de teléfono válido (9 dígitos sin espacios ni símbolos).",
    }),
  });

  // Hook de React Hook Form con validación de Zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
    },
  });

  // Función para enviar el formulario
  function onSubmit(values) {
    console.log(values);
    // Aquí podrías realizar el envío a tu API
    alert("Formulario enviado con éxito: " + JSON.stringify(values));
  }

  // Si está cargando, mostramos el componente de carga
  if (isLoading) {
    return <Loader />;
  }

  // Si hay un error, mostramos un mensaje
  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center p-4 transition-all duration-300">
        <div className="bg-zinc-900 p-8 rounded-xl max-w-md shadow-2xl transform transition-all duration-300">
          <div className="flex items-center justify-center mb-4 text-red-600">
            <HeartIcon className="h-12 w-12" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-center text-white">Error al cargar los productos</h2>
          <p className="text-gray-300 text-center">{error.message || "No se pudieron cargar los datos. Intenta de nuevo más tarde."}</p>
          <div className="mt-6 text-center">
            <button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-red-500/20">
              Intentar nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="text-center max-w-3xl mx-auto mb-16">
            {/* <span className="inline-block px-4 py-1 rounded-full bg-red-900/30 text-red-400 font-medium text-sm mb-4 animate-pulse">
              Ofertas Exclusivas
            </span> */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Las mejores ofertas en juegos y licencias
            </h1>
            <p className="text-xl md:text-2xl text-red-500 font-semibold">
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg">Productos hasta el 50% DESCUENTO</span>
            </p>
            <div className="mt-10">
              <Button
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-none text-white px-10 py-4 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-600/30 w-full sm:w-auto"
              >
                <SparklesIcon className="w-6 h-6 mr-2" />
                Ver Ofertas
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Mejorado con animaciones y efectos */}
      <section id="productos" className="py-16 bg-zinc-950 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Productos Destacados</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {products && products.length > 0 ? (
              products.map((product, index) => (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-zinc-900 border-zinc-800 rounded-xl group flex flex-col"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`
                  }}
                >
                  {/* La imagen ocupa exactamente la mitad de la tarjeta */}
                  <div className="h-1/2 relative overflow-hidden bg-zinc-950">
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
                  <div className="h-1/2 flex flex-col">
                    <CardContent className="p-5 flex-grow">
                      <h3 className="font-semibold text-lg mb-2 text-white">{product.name}</h3>
                      <div className="flex items-baseline space-x-3">
                        <span className="line-through text-gray-500 text-sm">S/.{product.regularPrice}</span>
                        <span className="text-2xl font-bold text-green-500">S/.{product.salePrice}</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 hover:shadow-green-600/30 transition-all duration-300 rounded-lg py-3 font-semibold">
                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                        Comprar Ahora
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-12 bg-zinc-900 rounded-xl border border-zinc-800 shadow">
                <div className="flex flex-col items-center">
                  <ShoppingCartIcon className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-xl text-gray-300 font-medium">No hay productos disponibles en este momento.</p>
                  <p className="text-gray-400 mt-2">Vuelve a revisar pronto para encontrar nuevas ofertas.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Secondary Offers Section - Con diseño mejorado */}
      <section id="ofertas" className="py-12 sm:py-16 bg-gradient-to-br from-black to-zinc-900 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="bg-zinc-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-zinc-800 p-8 lg:p-10 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl"></div>

            <div className="text-center mb-10 relative z-10">
              <h2 className="text-3xl font-bold mb-4 text-white">Aprovecha nuestras ofertas</h2>
              <div className="h-1 w-32 bg-red-600 mx-auto rounded-full"></div>
              <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
                Realiza tu compra de forma instantánea y recibe tus licencias en menos de 30 minutos. Soporte técnico disponible 24/7.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8 relative z-10 px-4">
                <div className="grid grid-cols-1 gap-6">
                  {/* Campo de nombre */}
                  <FormField
                    control={form.control}
                    name="nombre"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-300 font-medium text-lg">
                          <span className="flex items-center">
                            <UserIcon className="w-5 h-5 mr-2 text-gray-400" />
                            Nombre
                          </span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tu nombre completo"
                            className="bg-zinc-800 border-zinc-700 rounded-lg p-4 text-gray-200 placeholder:text-gray-500 focus:border-red-400 focus:ring-red-400 transition-all text-lg h-14"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  {/* Campo de teléfono */}
                  <FormField
                    control={form.control}
                    name="telefono"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-gray-300 font-medium text-lg">
                          <span className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-2 text-gray-400" />
                            Teléfono
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="flex">
                            <div className="flex-shrink-0 bg-zinc-800 border border-r-0 border-zinc-700 rounded-l-lg px-4 flex items-center h-14">
                              <Image
                                src="https://minio.wazend.net/alternative/Flag_of_Peru_09c0f50666.svg"
                                alt="Bandera de Perú"
                                width={24}
                                height={18}
                              />
                              <span className="ml-2 text-gray-300 text-lg">+51</span>
                            </div>
                            <Input
                              placeholder="Número de teléfono"
                              className="rounded-l-none bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500 focus:border-red-400 focus:ring-red-400 transition-all text-lg h-14"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-gray-400 text-sm">
                          Recibirás las licencias vía WhatsApp
                        </FormDescription>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-10 text-center">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 border-none text-white px-10 py-4 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-600/30 w-full sm:w-auto"
                  >
                    Solicitar información
                    <ArrowRightIcon className="w-6 h-6 ml-2" />
                  </Button>
                </div>
              </form>
            </Form>
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