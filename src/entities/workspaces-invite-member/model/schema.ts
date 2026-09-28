export interface WorkspaceMember {
  id: string;
  name?: string;
  fullName?: string;
  email: string;
  role: string;
  initials?: string;
  avatarClass?: string;
}

export interface InviteMemberRequest {
  workspaceId: string;
  data: {
    usernameOrEmail: string;
    role: string;
  };
}

export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp?: string;
}

export type InviteMemberResponse = BaseApiResponse<WorkspaceMember>;
export type GetAllMembersResponse = BaseApiResponse<WorkspaceMember[]>;
