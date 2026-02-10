import { request } from "./request";

export const httpGet = <T>(url: string, opts = {}) =>
  request<T>(url, { ...opts, method: "GET" });

export const httpPost = <T>(url: string, body?: unknown, opts = {}) =>
  request<T>(url, { ...opts, method: "POST", body });

export const httpPut = <T>(url: string, body?: unknown, opts = {}) =>
  request<T>(url, { ...opts, method: "PUT", body });

export const httpDelete = <T>(url: string, opts = {}) =>
  request<T>(url, { ...opts, method: "DELETE" });
