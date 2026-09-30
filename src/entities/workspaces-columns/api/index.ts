import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";

const workspaceColumnsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaceColumns: builder.query({
      query: ({ workspaceId }: { workspaceId: string }) =>
        `${API_MAP.WORKSPACE_COLUMNS(workspaceId)}`,
      providesTags: ["Workspace-columns"],
    }),
    postWorkspaceColumn: builder.mutation({
      query: ({
        workspaceId,
        title,
        order,
      }: {
        workspaceId: string;
        title: string;
        order: number;
      }) => ({
        url: API_MAP.WORKSPACE_COLUMNS(workspaceId),
        method: API_METHODS.POST,
        body: { title, order },
      }),
      invalidatesTags: ["Workspace-columns"],
    }),
    patchReorderColumns: builder.mutation({
      query: ({
        workspaceId,
        items,
      }: {
        workspaceId: string;
        items: { id: string; order: number }[];
      }) => ({
        url: API_MAP.WORKSPACE_COLUMNS(workspaceId),
        method: API_METHODS.PATCH,
        body: items,
      }),
      invalidatesTags: ["Workspace-columns"],
    }),
    deleteColumn: builder.mutation({
      query: ({ workspaceId, id }: { workspaceId: string; id: string }) => ({
        url: API_MAP.WORKSPACE_DELETE_COLUMN(workspaceId, id),
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Workspace-columns"],
    }),
  }),
});

export const {
  useGetWorkspaceColumnsQuery,
  usePostWorkspaceColumnMutation,
  usePatchReorderColumnsMutation,
  useDeleteColumnMutation,
} = workspaceColumnsApi;
