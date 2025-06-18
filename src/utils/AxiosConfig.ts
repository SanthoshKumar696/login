import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'react-toastify';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const errorMessage =
          (error.response.data as { message?: string })?.message || error.message;

        switch (status) {
          case 400:
            toast.error(`Bad Request: ${errorMessage}`);
            break;
          case 401:
            toast.error('Unauthorized: Please log in again!');
            break;
          case 403:
            toast.error("Forbidden: You don't have permission.");
            break;
          case 404:
            toast.error('Not Found: The requested resource was not found.');
            break;
          case 500:
            toast.error('Server Error: Something went wrong.');
            break;
          default:
            toast.error(`Error ${status}: ${errorMessage}`);
        }
      } else if (error.request) {
        toast.error('Network Error: Unable to reach server!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
