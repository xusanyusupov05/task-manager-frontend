import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";


export const kanbanInviteMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteMember: build.mutation({
      query: ({workspaceId, data}) => ({
        url: API_MAP.WORKSPACE_INVITE_MEMBER(workspaceId),
        method: API_METHODS.POST,
        body: data,
      }),
    }),
  }),
});

export const { useInviteMemberMutation } = kanbanInviteMemberApi;
  