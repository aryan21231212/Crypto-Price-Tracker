"use client";
import React, { useEffect, useState } from "react";

const CoinCards = () => {
  interface Coin {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  }

  const [coins, setCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);


  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full px-4 py-6">

      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-4 pr-4 py-2 rounded-xl bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-md placeholder-gray-500"
        />
      </div>


      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div
              key={coin.id}
              onClick={() => (window.location.href = `/coin/${coin.id}`)}
              className="flex items-center justify-between bg-gray-900 rounded-2xl p-4 shadow-lg hover:scale-[1.02] hover:bg-gray-800 transition transform duration-200 cursor-pointer"
            >

              <div className="flex items-center space-x-3">
                <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full"/>
                <div>
                  <h2 className="text-base font-semibold text-gray-100">
                    {coin.name}
                  </h2>
                  <p className="text-sm text-gray-400 uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>


              <div className="text-right">
                <p className="text-lg font-bold text-yellow-400">
                  ${coin.current_price.toLocaleString()}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-6">No coins found </p>
        )}
      </div>
    </div>
  );
};

export default CoinCards;
