import React, { useEffect, useState } from 'react';
import '../styles/Orders.css';
import OrderRow from '../components/OrderRow';

function OrdersPage() {
  const [openOrders, setOpenOrders] = useState([]);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  const fetchOrders = async () => {
    try {
      const [openRes, historyRes] = await Promise.all([
        fetch('http://localhost:8000/orders/open'),
        fetch('http://localhost:8000/orders/history'),
      ]);
      const openData = await openRes.json();
      const historyData = await historyRes.json();
      setOpenOrders(openData);
      setHistory(historyData);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this order?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:8000/orders/cancel?id=${id}`, {
        method: 'POST'
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Order ${id} cancelled.`);
        fetchOrders();
      } else {
        setMessage(`❌ Failed to cancel: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error cancelling order');
    }
  };

  return (
    <div className="orders-container">
      <h1>📘 Orders</h1>
      {message && <p className="status-message">{message}</p>}

      <div className="orders-section">
        <h2>Open Orders</h2>
        {openOrders.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pair</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {openOrders.map(order => (
                <OrderRow key={order.id} order={order} isOpen={true} onCancel={handleCancel} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No open orders.</p>
        )}
      </div>

      <div className="orders-section">
        <h2>Order History</h2>
        {history.length > 0 ? (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pair</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map(order => (
                <OrderRow key={order.id} order={order} isOpen={false} />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No past orders.</p>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
