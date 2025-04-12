import React, { useEffect, useState } from 'react';
import { getOpenOrders, getOrderHistory, cancelOrder } from "../api/coindcx";

const Orders = () => {
  const [openOrders, setOpenOrders] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getOpenOrders().then((res) => setOpenOrders(res.data));
    getOrderHistory().then((res) => setHistory(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Open Orders</h2>
      {openOrders.map((o, i) => (
        <div key={i} className="flex justify-between">
          {o.market} - {o.side} @ {o.price_per_unit}
          <button onClick={() => cancelOrder(o.id)}>Cancel</button>
        </div>
      ))}
      <h2 className="text-xl font-bold mt-4">Order History</h2>
      {history.map((o, i) => (
        <div key={i}>
          {o.market} - {o.side} - Status: {o.status}
        </div>
      ))}
    </div>
  );
};

export default Orders;
