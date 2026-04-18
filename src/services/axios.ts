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

const HIRYNN_BASE_URL =
  process.env.NEXT_PUBLIC_HIRYNN_URL ?? "https://voidnepal.com.np/hirynn-api/api";

// ─── Instances ────────────────────────────────────────────────────
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

export const directoryAxiosInstance = axios.create({
  baseURL: DIRECTORY_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

export const hirynnAxiosInstance = axios.create({
  baseURL: HIRYNN_BASE_URL,
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// ─── Shared interceptor factory ───────────────────────────────────
function attachInterceptors(instance: typeof axiosInstance) {
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
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
}

attachInterceptors(axiosInstance);
attachInterceptors(directoryAxiosInstance);
attachInterceptors(hirynnAxiosInstance);

export default axiosInstance;