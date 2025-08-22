"use client";
import React, { useEffect, useState } from "react";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div className="p-4 mb-26 space-y-4">
      {coins.map((coin: any, idx) => (
        <div
          key={coin.id}
          onClick={() => (window.location.href = `/coin/${coin.id}`)}
          className="flex items-center justify-between p-4 rounded-xl border shadow-sm  bg-gray-900 text-gray-200 cursor-pointer hover:shadow-md transition"
        >

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-500">{idx + 1}</span>
            <img src={coin.image} alt={coin.name} className="w-8 h-8" />
            <div>
              <p className="font-semibold">{coin.name}</p>
              <p className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>


          <div className="text-right">
            <p className="font-semibold">${coin.current_price.toLocaleString()}</p>
            <p
              className={`text-sm font-medium ${
                coin.price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-400">
              MCap: ${coin.market_cap.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoinTable;
