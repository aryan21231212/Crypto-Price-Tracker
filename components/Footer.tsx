import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#171717] w-full fixed  bottom-0 text-gray-400 py-6 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">


        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">CryptoTracker</span>. All rights reserved.
        </p>


        <nav>
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="hover:text-yellow-400 transition"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-yellow-400 transition"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-yellow-400 transition"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
