import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">

      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 py-10 px-5 text-center">
        <h1 className="text-4xl font-extrabold">About CryptoTracker</h1>
        <p className="mt-2 text-lg">Track crypto prices in real-time with ease 🚀</p>
      </div>


      <div className="max-w-3xl mx-auto p-8 leading-relaxed">

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">What is CryptoTracker?</h2>
          <p className="text-base text-gray-300">
            CryptoTracker is a simple, beginner-friendly application built with{" "}
            <span className="font-semibold text-yellow-400">Next.js</span> and{" "}
            <span className="font-semibold text-yellow-400">TailwindCSS</span> to
            view real-time cryptocurrency prices. Data is powered by the{" "}
            <a
              href="https://www.coingecko.com/en/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              CoinGecko API
            </a>.
          </p>
        </section>


        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Data Source</h2>
          <p className="text-base text-gray-300">
            All market data, including price, volume, and market cap, is fetched
            from the{" "}
            <span className="font-semibold text-yellow-400">free CoinGecko API</span>.
            It’s fast, reliable, and perfect for learning how to work with APIs in
            real-world projects.
          </p>
        </section>


        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Disclaimer</h2>
          <p className="text-sm italic text-gray-400">
            Prices may be delayed by a few seconds. This app is for{" "}
            <span className="font-semibold">educational purposes only</span> and
            should not be considered financial advice.
          </p>
        </section>


        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Credits</h2>
          <p className="text-base text-gray-300 mb-3">
            Built by <span className="font-semibold">Aryan Pratap Singh</span>.{" "}
            Check out the project on{" "}
            <a
              href="https://github.com/aryan21231212/Crypto-Price-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>.
          </p>

         
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
