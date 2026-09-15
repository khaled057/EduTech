import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the auth token (if the app has logged-in users) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize backend errors into a single readable message,
// so every screen can just read `error.message`.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong. Please try again.";
    return Promise.reject({ ...error, message, status: error.response?.status });
  }
);

export default api;
