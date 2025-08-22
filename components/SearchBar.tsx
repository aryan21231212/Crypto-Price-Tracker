import React from "react";

const SearchBar = () => {
  return (
    <div className="mt-6 flex justify-center">
      <form className="w-full max-w-md relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>


        <input
          type="text"
          id="search"
          placeholder="Search for a coin..."
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-900 text-gray-200 border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-md placeholder-gray-500"
        />


        <button
          type="submit"
          className="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-yellow-400 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2.5-5.5a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
