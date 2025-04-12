import React from 'react';

function OrderRow({ order, isOpen, onCancel }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.pair}</td>
      <td>{order.order_type}</td>
      <td>{order.amount}</td>
      <td>{order.price}</td>
      <td>{order.status}</td>
      {isOpen && (
        <td>
          <button className="cancel-btn" onClick={() => onCancel(order.id)}>Cancel</button>
        </td>
      )}
    </tr>
  );
}

export default OrderRow;
