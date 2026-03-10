/**
 * lib/axios.ts
 * ─────────────────────────────────────────────────────────────────
 * Centralised Axios instance for the entire Next.js app.
 *
 * .env.local:
 *   NEXT_PUBLIC_BASE_URL=https://api.betterschool.app/api
 *
 * NOTE: withCredentials is intentionally NOT set.
 * The BetterSchool API is a third-party service that returns
 * Access-Control-Allow-Origin: * — browsers block credentialed
 * requests (withCredentials: true) against wildcard CORS origins.
 * Only enable withCredentials on instances that talk to your own
 * backend which echoes back the exact requesting origin.
 */

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://api.betterschool.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request interceptor ──────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // SSR-safe: localStorage is only available in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// ─── Response interceptor ─────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status  = error.response?.status;
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";

    // SSR-safe redirect on 401
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (status === 403)          console.warn("[API] Forbidden –",    message);
    if (status && status >= 500) console.error("[API] Server error –", message);

    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;