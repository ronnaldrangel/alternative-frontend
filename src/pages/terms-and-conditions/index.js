// pages/terms.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen p-8 bg-black text-white flex flex-col items-center justify-center">
      <Head>
        <title>Terms and Conditions | Alternative</title>
        <meta name="description" content="Terms and Conditions for Alternative" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-8 cursor-pointer">
        <Link href="/">
          <Image
            src="https://landing-alternative.b-cdn.net/Logo%20Negativo.svg"
            alt="Alternative Logo"
            width={180}
            height={50}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </header>

      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl mb-8 text-center border-b border-gray-800 pb-4">Terms of Service</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">1. Terms</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              By accessing the website at Alternative you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">2. Use License</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Permission is granted to temporarily download one copy of the materials (information or software) on Alternative's website for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not:
            </p>
            <ul className="inline-block text-left mb-4">
              <li className="mb-2">modify or copy the materials;</li>
              <li className="mb-2">use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
              <li className="mb-2">attempt to decompile or reverse engineer any software contained on Alternative website;</li>
              <li className="mb-2">remove any copyright or other proprietary notations from the materials; or</li>
              <li className="mb-2">transfer the materials to another person or 'mirror' the materials on any other server.</li>
            </ul>
            <p className="mb-4 leading-relaxed text-center">
              This licence shall automatically terminate if you violate any of these restrictions and may be terminated by Alternative at any time. Upon terminating your viewing of these materials or upon the termination of this licence, you must destroy any downloaded materials in your possession whether in electronic or printed format.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">3. Disclaimer</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              The materials on Alternative's website are provided on an 'as is' basis. Alternative makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="mb-4 leading-relaxed text-center">
              Further, Alternative does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">4. Limitations</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              In no event shall Alternative or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Alternative's website, even if Alternative or a Alternative authorised representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">5. Accuracy of materials</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              The materials appearing on Alternative's website could include technical, typographical, or photographic errors. Alternative does not warrant that any of the materials on its website are accurate, complete or current. Alternative may make changes to the materials contained on its website at any time without notice. However Alternative does not make any commitment to update the materials.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">6. Links</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Alternative has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Alternative of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">7. Modifications</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Alternative may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">8. Governing Law</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              These terms and conditions are governed by and construed in accordance with the laws of Alternative and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center text-gray-500 border-t border-gray-800 pt-4 w-full">
        <p>© {new Date().getFullYear()} Alternative. All rights reserved.</p>
      </footer>
    </div>
  );
}