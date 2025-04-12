import React, { useState } from 'react';
import '../styles/Trade.css';

function TradePage() {
  const [pair, setPair] = useState('BTC/INR');
  const [orderType, setOrderType] = useState('market');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pair,
      order_type: orderType,
      amount,
      ...(orderType === 'limit' && { price })
    };

    try {
      const res = await fetch('http://localhost:8000/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`✅ Order placed: ${data.message || 'Success'}`);
      } else {
        setStatusMessage(`❌ Failed: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage('❌ Network error. Please try again.');
    }
  };

  return (
    <div className="trade-container">
      <h1>🧾 Place a Trade</h1>
      <form className="trade-form" onSubmit={handleSubmit}>
        <label>
          Trading Pair:
          <select value={pair} onChange={e => setPair(e.target.value)}>
            <option value="BTC/INR">BTC/INR</option>
            <option value="ETH/INR">ETH/INR</option>
            <option value="XRP/INR">XRP/INR</option>
            <option value="DOGE/INR">DOGE/INR</option>
          </select>
        </label>

        <label>
          Order Type:
          <select value={orderType} onChange={e => setOrderType(e.target.value)}>
            <option value="market">Market</option>
            <option value="limit">Limit</option>
          </select>
        </label>

        <label>
          Amount:
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </label>

        {orderType === 'limit' && (
          <label>
            Price:
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
          </label>
        )}

        <button type="submit">Place Order</button>
      </form>

      {statusMessage && <p className="trade-status">{statusMessage}</p>}
    </div>
  );
}

export default TradePage;
