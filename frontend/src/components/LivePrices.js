import React, { useEffect, useState } from 'react';
import '../styles/LivePrices.css';

const dummyPrices = [
  { pair: 'BTC/INR', price: 3000000 },
  { pair: 'ETH/INR', price: 200000 },
  { pair: 'XRP/INR', price: 50 },
  { pair: 'DOGE/INR', price: 10 },
  { pair: 'ADA/INR', price: 40 }
];

function LivePrices() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(
        dummyPrices.map(p => ({
          ...p,
          price: (p.price * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2)
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-prices">
      <h2>📈 Live Market Prices</h2>
      <div className="prices-grid">
        {prices.map(p => (
          <div className="price-card" key={p.pair}>
            <h3>{p.pair}</h3>
            <p>₹ {p.price}</p>
            <button onClick={() => window.location.href = '/trade'}>Trade</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LivePrices;
