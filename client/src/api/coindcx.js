import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const healthCheck = () => API.get("/health");
export const getBalance = () => API.get("/balance");
export const placeOrder = (data) => API.post("/trade", data);
export const getOpenOrders = () => API.get("/orders/open");
export const getOrderHistory = () => API.get("/orders/history");
export const cancelOrder = (id) => API.post("/orders/cancel", { order_id: id });