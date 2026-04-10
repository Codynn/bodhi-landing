import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://api.betterschool.app/api";

const DIRECTORY_BASE_URL =
  process.env.NEXT_PUBLIC_DIRECTORY_BASE_URL ??
  "https://api.betterschool.app/directory";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const directoryAxiosInstance = axios.create({
  baseURL: DIRECTORY_BASE_URL,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});
// ─── Request interceptor ──────────────────────────────────────────
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response interceptor ─────────────────────────────────────────
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ?? error.message ?? "Something went wrong";

    if (status === 403) console.warn("[API] Forbidden –", message);
    if (status && status >= 500) console.error("[API] Server error –", message);

    return Promise.reject(new Error(message));
  },
);

export default axiosInstance;
