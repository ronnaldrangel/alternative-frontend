import "@/styles/globals.css";
import Head from 'next/head';
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Alternative</title>
      </Head>
      <Toaster closeButton richColors position="top-right" />
      <Component {...pageProps} />
    </>
  );
}
