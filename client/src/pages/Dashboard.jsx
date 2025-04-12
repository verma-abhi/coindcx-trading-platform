import React, { useEffect, useState } from 'react';
import { getBalance } from "../api/coindcx";
import { healthCheck } from '../api/coindcx';

const Dashboard = () => {
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    getBalance().then((res) => setBalances(res.data));
  }, []);

  useEffect(() => {
    healthCheck().then(res => console.log(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Account Balances</h2>
      {balances.map((bal, idx) => (
        <div key={idx}>
          {bal.currency}: {bal.balance}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
