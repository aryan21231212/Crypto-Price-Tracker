"use client";
import React, { useEffect, useState } from "react";

const CoinTable = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
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
    <div className="flex w-full justify-center mt-8 px-4">
      <div className="w-full flex justify-center max-w-6xl overflow-x-auto">
        <table className=" text-left border-collapse bg-gray-900 text-gray-200 shadow-lg rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
              <th className="px-4 py-3">S.NO</th>
              <th className="px-4 py-3">Coin</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">24h Change</th>
              <th className="px-4 py-3">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin: any, idx) => (
              <tr
                onClick={() => (window.location.href = `/coin/${coin.id}`)}
                key={coin.id}
                className="border-b border-gray-700 hover:bg-gray-800 transition cursor-pointer"
              >
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3 flex items-center space-x-2">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                  <span>{coin.name}</span>
                  <span className="text-gray-500 text-sm">
                    ({coin.symbol.toUpperCase()})
                  </span>
                </td>
                <td className="px-4 py-3">
                  ${coin.current_price.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-3 font-semibold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="px-4 py-3">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
