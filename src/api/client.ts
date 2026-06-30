import axios, { AxiosError } from "axios";
import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "./config";

export const api = axios.create({ baseURL: API_BASE_URL, timeout: REQUEST_TIMEOUT_MS });

// we are tranfersing response directly, so no need to destruct data everywhere in response, and also handing the error in a single place
api.interceptors.response.use((res) => res.data, async (error: AxiosError) => {
    return Promise.reject((error.response?.data as AxiosError) ?? error);
})