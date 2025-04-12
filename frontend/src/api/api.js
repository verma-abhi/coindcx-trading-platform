import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

export const healthCheck = () => axios.get(`${BASE_URL}/health`);

export const placeOrder = (data) => axios.post(`${BASE_URL}/trade`, data);

export const getOpenOrders = () => axios.get(`${BASE_URL}/orders/open`);

export const getOrderHistory = () => axios.get(`${BASE_URL}/orders/history`);

export const cancelOrder = (id) => axios.post(`${BASE_URL}/orders/cancel`, { id });
