import axios from "axios";
import { getAccessToken } from "@/service/auth/token";
import { performTokenRefresh } from "./refresh";

export const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(config => {
  const token = getAccessToken();

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

http.interceptors.response.use(
  r => r,
  async error => {
    const status = error?.response?.status;
    const original = error.config;

    if (status === 401 && !original._retry) {
      original._retry = true;

      try {
        const token = await performTokenRefresh();

        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${token.access_token}`;

        return http.request(original);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

