import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";



const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (body: {name: string, password: string}) => ({
        url: API_MAP.AUTH.REGISTER,
        method: API_METHODS.POST,
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body: {name: string, password: string}) => ({
        url: API_MAP.AUTH.LOGIN,
        method: API_METHODS.POST,
        body,
      }),
    }),
    
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
