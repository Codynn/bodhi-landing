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
// ✅ No default Content-Type on any instance.
//    Setting it globally would lock every request to application/json
//    and break multipart/form-data file uploads (axios needs to set
//    the boundary automatically when it detects FormData).
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
});

export const directoryAxiosInstance = axios.create({
  baseURL: DIRECTORY_BASE_URL,
  timeout: 15_000,
});

export const hirynnAxiosInstance = axios.create({
  baseURL: HIRYNN_BASE_URL,
  timeout: 15_000,
});

// ─── Shared interceptor factory ───────────────────────────────────
function attachInterceptors(instance: typeof axiosInstance) {
  // ── Request ──────────────────────────────────────────────────────
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Attach auth token if present
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      // ✅ Set application/json ONLY for non-FormData requests.
      //    For FormData, axios auto-sets: multipart/form-data; boundary=XXXXX
      if (!(config.data instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // ── Response ─────────────────────────────────────────────────────
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError<{ message?: string }>) => {
      const status  = error.response?.status;
      const message = error.response?.data?.message ?? error.message ?? "Something went wrong";

      if (status === 403) console.warn("[API] Forbidden –", message);
      if (status && status >= 500) console.error("[API] Server error –", message);

      // ✅ Re-throw the ORIGINAL AxiosError — never wrap in new Error()
      //    Wrapping destroys error.response so components can't read
      //    the backend's error body (status code, message, validation errors)
      return Promise.reject(error);
    },
  );
}

attachInterceptors(axiosInstance);
attachInterceptors(directoryAxiosInstance);
attachInterceptors(hirynnAxiosInstance);

export default axiosInstance;