import type { AxiosRequestConfig } from "axios";
import { api } from "./client";

export function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const config: AxiosRequestConfig | undefined = params ? { params } : undefined;

    return api.get(url, config)
}

export function post<T>(url: string, body?: unknown): Promise<T> {
    return api.post(url, body);
}

export function patch<T>(url: string, body?: unknown): Promise<T> {
    return api.patch(url, body);
}

export function del<T>(url: string): Promise<T> {
    return api.delete(url);
}