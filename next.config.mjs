/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['minio.wazend.net'], // Agrega el dominio aquí
  },
};

export default nextConfig;
