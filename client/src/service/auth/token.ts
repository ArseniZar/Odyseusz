import type { Token } from "@/types/api/auth";

const ACCESS_KEY = "access_token";
const REFRESH_KEY = "refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(token: Token) {
  localStorage.setItem(ACCESS_KEY, token.access_token);
  localStorage.setItem(REFRESH_KEY, token.refresh_token);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}
