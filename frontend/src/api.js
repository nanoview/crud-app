import axios from "axios";
export const api = axios.create({ baseURL: 'https://crud-app-kyih.onrender.com/api/books' });
