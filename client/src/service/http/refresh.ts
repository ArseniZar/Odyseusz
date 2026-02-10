import type { Token } from "@/types/api/auth";
import { getRefreshToken, setTokens, clearTokens } from "@/service/auth/token";
import { http } from "./client";

let refreshPromise: Promise<Token> | null = null;

export function performTokenRefresh(): Promise<Token> {
  if (!refreshPromise) {
    const refresh = getRefreshToken();

    if (!refresh) {
      clearTokens();
      return Promise.reject(new Error("No refresh token"));
    }

    refreshPromise = http
      .post<Token>(`/auth/refresh?refresh_token=${encodeURIComponent(refresh)}`)
      .then(r => {
        setTokens(r.data);
        return r.data;
      })
      .catch(err => {
        clearTokens();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
