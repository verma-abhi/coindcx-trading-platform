import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide hover:text-yellow-300 cursor-pointer transition duration-300">
          CoinDCX Trader 
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#dashboard" className="hover:text-yellow-200 transition duration-300">
            Dashboard
          </a>
          <a href="#trade" className="hover:text-yellow-200 transition duration-300">
            Trade
          </a>
          <a href="#orders" className="hover:text-yellow-200 transition duration-300">
            Orders
          </a>
        </nav>

        {/* API Button */}
        <div className="hidden md:block">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300 font-semibold transition duration-300">
            + API Keys
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
