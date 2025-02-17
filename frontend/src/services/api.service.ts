import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const authState = JSON.parse(localStorage.getItem("auth_state") as string);
  if (authState) {
    config.headers.Authorization = `Bearer ${authState.token}`;
  }
  return config;
});

export default api;
