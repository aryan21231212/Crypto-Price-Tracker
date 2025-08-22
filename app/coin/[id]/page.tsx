"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  // Fetch coin details
  useEffect(() => {
    const fetchCoin = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const data = await res.json();
      setCoin(data);
    };

    const fetchChart = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      const data = await res.json();
      const formatted = data.prices.map((p: any) => ({
        date: new Date(p[0]).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: p[1],
      }));
      setChartData(formatted);
    };

    fetchCoin();
    fetchChart();
  }, [id]);

  if (!coin) return <div className="text-gray-300 text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-200">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={coin.image.large}
          alt={coin.name}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-yellow-400">{coin.name}</h1>
          <p className="uppercase text-gray-400">{coin.symbol}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10">
        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">Current Price</p>
          <p className="text-2xl font-bold">${coin.market_data.current_price.usd.toLocaleString()}</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">Market Cap</p>
          <p className="text-2xl font-bold">${coin.market_data.market_cap.usd.toLocaleString()}</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">24h High</p>
          <p className="text-2xl font-bold">${coin.market_data.high_24h.usd.toLocaleString()}</p>
        </div>
        <div className="bg-[#1E1E1E] p-6 rounded-xl shadow text-center">
          <p className="text-gray-400">24h Low</p>
          <p className="text-2xl font-bold">${coin.market_data.low_24h.usd.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow mt-12">
        <h2 className="text-xl font-bold mb-4">7 Day Price Chart</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1E1E1E", border: "none" }}
              labelStyle={{ color: "#fff" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#facc15"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Description & Links */}
      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow mt-12">
        <h2 className="text-xl font-bold mb-4">About {coin.name}</h2>
        <p
          className="text-gray-300 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: coin.description.en
              ? coin.description.en.split(". ").slice(0, 5).join(". ") + "."
              : "No description available.",
          }}
        ></p>

        {/* Official Links */}
        <div className="mt-6 mb-8">
          <h3 className="text-lg font-semibold mb-2">Official Links</h3>
          <ul className="space-y-2 text-yellow-400">
            {coin.links.homepage[0] && (
              <li>
                {" "}
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Website
                </a>
              </li>
            )}
            {coin.links.repos_url.github[0] && (
              <li>
                {" "}
                <a
                  href={coin.links.repos_url.github[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
            )}
            {coin.links.subreddit_url && (
              <li>
                {" "}
                <a
                  href={coin.links.subreddit_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Community (Reddit)
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
