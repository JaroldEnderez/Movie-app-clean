// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // React
  // baseURL: process.env.NEXT_PUBLIC_API_URL, // Next.js
});

export default api;
