import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";


export const workspaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query({
      query: () => ({
        url: API_MAP.WORKSPACE,
        method: API_METHODS.GET,
        providesTags: [{ type: "Workspace" }]
      })
    }),
    postWorkspace: builder.mutation({
      query: (body) => ({
        url: API_MAP.WORKSPACE,
        method: API_METHODS.POST,
        body,
        invalidatesTags: [{ type: "Workspace" }]
      })
    }),
    
  }),
});

export const { useGetWorkspacesQuery, usePostWorkspaceMutation } = workspaceApi;