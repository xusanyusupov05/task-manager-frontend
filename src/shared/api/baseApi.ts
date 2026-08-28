import type { BaseQueryApi, FetchArgs } from "@reduxjs/toolkit/query/react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: Record<string, unknown>) => {
  const result = await fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  })(args, api, extraOptions);

  if (result.error) {
    console.error('API Error:', result.error);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  refetchOnReconnect: true,
  endpoints: () => ({}),
  tagTypes:[
    
  ]
})
