import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

// Configure axios for Django backend
const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.response?.status === 404 || error?.response?.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});

// Default fetcher function for Django API
const defaultFetcher = async (url: string): Promise<any> => {
  const response = await apiClient.get(url);
  return response.data;
};

// Override the default fetcher for the query client
queryClient.setDefaultOptions({
  queries: {
    queryFn: ({ queryKey }) => defaultFetcher(queryKey[0] as string),
  },
});

// API request helper for mutations
export const apiRequest = async (url: string, options: any = {}) => {
  const { method = 'GET', data, ...config } = options;
  
  const response = await apiClient.request({
    url,
    method,
    data,
    ...config,
  });
  
  return response.data;
};

export { queryClient, apiClient };
