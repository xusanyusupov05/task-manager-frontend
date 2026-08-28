import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";

export interface UserMe {
  id: string;
  fullName: string;
}

export interface GetMeResponse {
  success: boolean;
  message: string;
  data: UserMe;
  timestamp?: string;
}

const meApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<GetMeResponse, void>({
      query: () => ({
        url: API_MAP.AUTH.ME,
        method: API_METHODS.GET,
      }),
    }),
  }),
});

export const { useGetMeQuery } = meApi;