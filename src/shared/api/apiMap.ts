export const API_MAP = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
  },
  WORKSPACE: "/workspaces",
  WORKSPACE_BY_ID: (id: string) => `/workspaces/${id}`,
  WORKSPACE_COLUMNS: (workspaceId: string) =>
    `/workspaces/${workspaceId}/columns`,
  WORKSPACE_COLUMN_ITEM: (workspaceId: string, columnId: string) =>
    `/workspaces/${workspaceId}/columns/${columnId}`,
  WORKSPACE_BOARD: (workspaceId: string) => `/workspaces/${workspaceId}/board`,
};
