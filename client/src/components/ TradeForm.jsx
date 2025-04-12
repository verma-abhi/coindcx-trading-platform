import React,{ useState } from "react";
import { placeOrder } from "../api/coindcx";

const TradeForm = () => {
  const [form, setForm] = useState({
    market: "BTCINR",
    side: "buy",
    price: "",
    quantity: "",
    order_type: "limit",
  });

  const submit = () => {
    placeOrder(form).then((res) => alert(JSON.stringify(res)));
  };

  return (
    <div className="space-y-4">
      <input placeholder="Market (e.g. BTCINR)" onChange={(e) => setForm({ ...form, market: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, side: e.target.value })}>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>
      <input placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Quantity" onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, order_type: e.target.value })}>
        <option value="limit">Limit</option>
        <option value="market">Market</option>
      </select>
      <button onClick={submit} className="bg-blue-500 text-white p-2 rounded">Place Order</button>
    </div>
  );
};

export default TradeForm;
