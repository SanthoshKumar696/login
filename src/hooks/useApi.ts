import { useState, useCallback } from "react";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../utils/AxiosConfig";

interface CallApiOptions<T> {
  params?: Record<string, unknown>;
  data?: T;
  baseURLOverride?: string;
  responseType?: AxiosRequestConfig["responseType"];
}

function useApi<R = unknown, T = unknown>(
  endpoint: string,
  method: AxiosRequestConfig["method"] = "GET"
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<unknown>(null);

  const callApi = useCallback(
    async ({
      params = {},
      data: requestData = {} as T,
      baseURLOverride = "",
      responseType = "json",
    }: CallApiOptions<T> = {}): Promise<AxiosResponse<R>> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance<R>({
          url: endpoint,
          method,
          params,
          data: requestData,
          baseURL: baseURLOverride || undefined,
          responseType,
        });

        setData(response.data);
        return response;
      } catch (err) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method]
  );

  return { callApi, loading, data, error };
}

export default useApi;
