import axios from "axios";

// Prefer an explicit VITE_API_URL. If not present, use localhost during development,
// otherwise default to the Render backend URL provided by the user.
const base = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development'
  ? 'http://localhost:5000/api/books'
  : 'https://crud-app-kyih.onrender.com/api/books');

export const api = axios.create({ baseURL: base });
