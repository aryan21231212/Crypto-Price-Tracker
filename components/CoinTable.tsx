"use client";
import React, { useEffect, useState } from "react";

const CoinTable = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
        );
        const data = await res.json();
        setCoins(data);
        setFilteredCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const results = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(value) ||
        coin.symbol.toLowerCase().includes(value)
    );
    setFilteredCoins(results);
  };

  return (
    <div className="flex flex-col items-center w-full mt-8 px-4">

      <div className="mb-6 w-full max-w-md relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a coin..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-md placeholder-gray-500"
        />
        <svg
          className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2.5-5.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
          />
        </svg>
      </div>


      <div className="w-full flex justify-center max-w-6xl overflow-x-auto">
        <table className=" w-full text-left border-collapse bg-gray-900 text-gray-200 shadow-lg rounded-xl overflow-hidden">
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
            {filteredCoins.map((coin, idx) => (
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
