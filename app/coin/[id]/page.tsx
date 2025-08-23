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
import Image from "next/image";

interface CoinData {
  name: string;
  symbol: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
  };
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    repos_url: {
      github: string[];
    };
    subreddit_url: string;
  };
}

interface ChartData {
  date: string;
  price: number;
}

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {

        const coinRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            headers: {
              'Accept': 'application/json',
            },

            signal: AbortSignal.timeout(10000)
          }
        );
        
        if (!coinRes.ok) {
          throw new Error(`Failed to fetch coin data: ${coinRes.status}`);
        }
        
        const coinData = await coinRes.json();
        setCoin(coinData);


        await new Promise(resolve => setTimeout(resolve, 500));
        
        const chartRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`,
          {
            headers: {
              'Accept': 'application/json',
            },
            signal: AbortSignal.timeout(10000)
          }
        );
        
        if (!chartRes.ok) {
          throw new Error(`Failed to fetch chart data: ${chartRes.status}`);
        }
        
        const chartData = await chartRes.json();
        const formatted = chartData.prices.map((p: [number, number]) => ({
          date: new Date(p[0]).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          price: p[1],
        }));
        setChartData(formatted);
        
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching data:", error);
          setError(error.message || "Failed to fetch data. Please try again later.");
        } else {
          console.error("Unexpected error:", error);
          setError("An unexpected error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatNumber = (num: number): string => {
    if (num >= 1e12) {
      return `$${(num / 1e12).toFixed(2)}T`;
    } else if (num >= 1e9) {
      return `$${(num / 1e9).toFixed(2)}B`;
    } else if (num >= 1e6) {
      return `$${(num / 1e6).toFixed(2)}M`;
    } else if (num >= 1e3) {
      return `$${(num / 1e3).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const fetchData = async () => {
        try {
          const coinRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
          const coinData = await coinRes.json();
          setCoin(coinData);

          const chartRes = await fetch(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
          );
          const chartData = await chartRes.json();
          const formatted = chartData.prices.map((p: [number, number]) => ({
            date: new Date(p[0]).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            price: p[1],
          }));
          setChartData(formatted);
          setError(null);
        } catch (error) {
          console.error("Error retrying fetch:", error);
          setError("Failed to fetch data. Please check your connection and try again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchData();
    }, 1000);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-200 text-center">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
          <p>Loading coin data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-200 text-center">
        <div className="bg-red-900/30 p-6 rounded-xl max-w-md mx-auto">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={retryFetch}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-200 text-center">
        <p>No coin data available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-gray-200">

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <Image 
          src={coin.image.large} 
          alt={coin.name} 
          width={96} 
          height={96} 
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full" 
        />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-yellow-400">{coin.name}</h1>
          <p className="uppercase text-gray-400">{coin.symbol}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-center">
          <p className="text-gray-400 text-xs sm:text-sm">Current Price</p>
          <p className="text-lg sm:text-2xl font-bold truncate" title={`$${coin.market_data.current_price.usd.toLocaleString()}`}>
            ${coin.market_data.current_price.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-center">
          <p className="text-gray-400 text-xs sm:text-sm">Market Cap</p>
          <p className="text-lg sm:text-2xl font-bold truncate" title={`$${coin.market_data.market_cap.usd.toLocaleString()}`}>
            {formatNumber(coin.market_data.market_cap.usd)}
          </p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-center">
          <p className="text-gray-400 text-xs sm:text-sm">24h High</p>
          <p className="text-lg sm:text-2xl font-bold truncate" title={`$${coin.market_data.high_24h.usd.toLocaleString()}`}>
            ${coin.market_data.high_24h.usd.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#1E1E1E] p-4 rounded-xl shadow text-center">
          <p className="text-gray-400 text-xs sm:text-sm">24h Low</p>
          <p className="text-lg sm:text-2xl font-bold truncate" title={`$${coin.market_data.low_24h.usd.toLocaleString()}`}>
            ${coin.market_data.low_24h.usd.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="bg-[#1E1E1E] p-6 rounded-xl shadow mt-12">
        <h2 className="text-xl font-bold mb-4">7 Day Price Chart</h2>
        {chartData.length > 0 ? (
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
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-400">
            Chart data not available
          </div>
        )}
      </div>

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

        <div className="mt-6 mb-20">
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