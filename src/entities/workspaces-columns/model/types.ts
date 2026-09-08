export interface WorkspaceColumn {
  id: string;
  workspaceId: string;
  title: string;
  order: number;
  isDefault: boolean;
}

export interface GetWorkspaceColumnsResponse {
  success: boolean;
  message: string;
  data: WorkspaceColumn[];
  timestamp?: string;
}
