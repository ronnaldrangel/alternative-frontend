// pages/privacy.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen p-8 bg-black text-white flex flex-col items-center justify-center">
      <Head>
        <title>Privacy Policy | Alternative</title>
        <meta name="description" content="Privacy Policy for Alternative" />
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
        <h1 className="text-4xl mb-8 text-center border-b border-gray-800 pb-4">Privacy Policy</h1>
        
        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">1. Overview</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Your privacy is important to us. It is Alternative's policy to respect your privacy regarding any information we may collect from you across our website, Alternative, and other sites we own and operate.
            </p>
            <p className="mb-4 leading-relaxed text-center">
              We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">2. Data Retention</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">3. Information Sharing</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              We don't share any personally identifying information publicly or with third-parties, except when required to by law.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">4. External Links</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">5. Your Rights</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
            </p>
            <p className="mb-4 leading-relaxed text-center">
              Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">6. Cookie Policy</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              This is the Cookie Policy for Alternative, accessible from URL https://alternativelat.com/.
            </p>
            <h3 className="text-xl my-4 text-center">What Are Cookies</h3>
            <p className="mb-4 leading-relaxed text-center">
              As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or break certain elements of the sites functionality.
            </p>
            <h3 className="text-xl my-4 text-center">How We Use Cookies</h3>
            <p className="mb-4 leading-relaxed text-center">
              We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
            </p>
            <h3 className="text-xl my-4 text-center">Disabling Cookies</h3>
            <p className="mb-4 leading-relaxed text-center">
              You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site. Therefore it is recommended that you do not disable cookies.
            </p>
            <h3 className="text-xl my-4 text-center">The Cookies We Set</h3>
            <p className="mb-4 leading-relaxed text-center">
              We use cookies to provide you with the best possible experience on our website. The cookies we set may include account-related cookies, site preferences, analytics, and functional cookies that enhance your browsing experience.
            </p>
            <h3 className="text-xl my-4 text-center">Third Party Cookies</h3>
            <p className="mb-4 leading-relaxed text-center">
              In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
            </p>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">7. User's Responsibilities</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              The user undertakes the responsibility to make appropriate use of the contents and information offered on the site with enunciative, but not imitative, behaviour:
            </p>
            <ul className="inline-block text-left mb-4">
              <li className="mb-2">Not to engage in activities that are illegal or contrary to good faith and public order;</li>
              <li className="mb-2">Not to spread propaganda or content of a racist, xenophobic or gambling nature, any type of illegal pornography, terrorist claims or against human rights;</li>
              <li className="mb-2">Do not cause damage to physical systems (hardware) and unattainable (software) of Alternative, its suppliers or third parties, to introduce or disseminate computer viruses or any other hardware or software systems that are capable of causing damage previously mentioned.</li>
            </ul>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl mb-4 p-2 bg-gray-900 rounded text-center">8. More Information</h2>
          <div className="px-4">
            <p className="mb-4 leading-relaxed text-center">
              Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
            </p>
            <p className="mb-4 leading-relaxed text-center">
              This policy is effective as of 7 May 2025 15:17.
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