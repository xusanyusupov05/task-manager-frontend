import { API_METHODS } from "@/shared/api/api-metods";
import { API_MAP } from "@/shared/api/apiMap";
import { baseApi } from "@/shared/api/baseApi";
import type {
  GetAllMembersResponse,
  InviteMemberRequest,
  InviteMemberResponse,
} from "../model/schema";

export const kanbanInviteMemberApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    inviteMember: build.mutation<InviteMemberResponse, InviteMemberRequest>({
      query: ({ workspaceId, data }) => ({
        url: API_MAP.WORKSPACE_INVITE_MEMBER(workspaceId),
        method: API_METHODS.POST,
        body: data,
      }),
      invalidatesTags: ["Workspace-members"],
    }),
    getAllMembers: build.query<GetAllMembersResponse, string>({
      query: (workspaceId) => ({
        url: API_MAP.WOKSPACE_GET_ALL_MEMBERS(workspaceId),
        method: API_METHODS.GET,
      }),
      providesTags: ["Workspace-members"],
    }),

    deleteMemberWorkspace: build.mutation<
      void,
      { workspaceId: string; memberId: string }
    >({
      query: ({ workspaceId, memberId }) => ({
        url: API_MAP.WORKSPACE_DELETE_MEMBER(workspaceId, memberId),
        method: API_METHODS.DELETE,
      }),
      invalidatesTags: ["Workspace-members"],
    }),

    updateMemberRole: build.mutation<
      void,
      { workspaceId: string; userId: string; role: string }
    >({
      query: ({ workspaceId, userId, role }) => ({
        url: API_MAP.WORKSPACE_UPDATE_MEMBER_ROLE(workspaceId, userId),
        method: API_METHODS.PATCH,
        body: { role },
      }),
      invalidatesTags: ["Workspace-members"],
    }),
  }),
});

export const {
  useInviteMemberMutation,
  useGetAllMembersQuery,
  useDeleteMemberWorkspaceMutation,
  useUpdateMemberRoleMutation,
} = kanbanInviteMemberApi;
