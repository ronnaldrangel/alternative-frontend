// lib/strapiService.js
import useSWR from 'swr';

// Función fetcher para obtener los datos desde la API interna de Next.js
const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Failed to fetch data from Next.js API route');
  }

  const data = await res.json();

  if (data.data && Array.isArray(data.data)) {
    return data.data;  // Devolver los datos del array 'socials'
  } else {
    throw new Error('No se encontraron datos válidos');
  }
};

// Función para obtener datos de Strapi (usando la API interna de Next.js)
export function useStrapiData(endpoint) {
  const { data, error } = useSWR(
    `/api/strapi?endpoint=${endpoint}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
}
