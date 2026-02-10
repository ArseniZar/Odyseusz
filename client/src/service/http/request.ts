import { http } from "./client";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  accessToken?: string;
}

export class HttpError extends Error {
  status?: number;
  detail?: string;
  data?: unknown;

  constructor(message: string, status?: number, detail?: string, data?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.detail = detail;
    this.data = data;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export async function request<T>(
  url: string,
  options: RequestOptions = {},
): Promise<T> {
  try {
    const resp = await http.request<T>({
      url,
      method: options.method ?? "GET",
      data: options.body,
      headers: options.accessToken
        ? { Authorization: `Bearer ${options.accessToken}` }
        : options.headers,
      signal: options.signal,
    });

    return resp.data;
  } catch (err: any) {
    const status = err?.response?.status;
    const detail = err?.response?.data?.detail;
    const data = err?.response?.data;
    const message = detail || err.message || (status ? `HTTP ${status}` : "Request failed");
    throw new HttpError(message, status, detail, data);
  }
}
