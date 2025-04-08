// components/ContactForm.js
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Image from "next/image";
import { toast } from 'sonner';
import { UserIcon, PhoneIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

// Webhook URL
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;

const ContactForm = () => {
  const router = useRouter(); // Inicializar el hook router
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar errores al editar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nombre || formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres.";
    }
    
    if (!formData.telefono || !/^[0-9]{9}$/.test(formData.telefono)) {
      newErrors.telefono = "Introduce un número de teléfono válido (9 dígitos).";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      toast.success('Enviado correctamente.');
      setFormData({ nombre: '', telefono: '' });

      // Redirigir a la página de éxito cuando se envíe correctamente
      router.push('/thank-you');


    } catch (error) {
      console.error("Error al enviar formulario:", error);
      toast.error('Hubo un error al enviar el formulario.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo nombre */}
        <div>
          <label htmlFor="nombre" className="block text-base font-medium text-gray-300">
            <span className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
              Nombre
            </span>
          </label>
          <div className="mt-1">
                          <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              autoComplete="name"
              placeholder="Tu nombre completo"
              className="w-full px-4 py-3 text-base bg-zinc-800 border border-zinc-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
          {errors.nombre && (
            <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
          )}
        </div>

        {/* Campo teléfono */}
        <div>
          <label htmlFor="telefono" className="block text-base font-medium text-gray-300">
            <span className="flex items-center">
              <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
              WhatsApp
            </span>
          </label>
          <div className="mt-1 flex">
            <div className="flex-shrink-0 bg-zinc-800 border border-r-0 border-zinc-700 rounded-l-xl px-3 flex items-center">
              <Image
                src="https://landing-alternative.b-cdn.net/peru.svg"
                alt="Bandera de Perú"
                width={20}
                height={15}
              />
              <span className="ml-2 text-gray-300 text-base">+51</span>
            </div>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={(e) => {
                // Solo permitir números
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData(prev => ({ ...prev, telefono: value }));
                
                // Limpiar errores al editar
                if (errors.telefono) {
                  setErrors(prev => ({ ...prev, telefono: null }));
                }
              }}
              autoComplete="tel"
              inputMode="numeric"
              maxLength={9}
              placeholder="Número de WhatsApp"
              className="w-full rounded-l-none rounded-r-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-base text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
            />
          </div>
          {/* <p className="mt-1 text-sm text-gray-400">Recibirás las licencias vía WhatsApp</p> */}
          {errors.telefono && (
            <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-600/30 transition duration-300 hover:scale-105 focus:outline-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </>
            ) : (
              <>
                Continuar
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;