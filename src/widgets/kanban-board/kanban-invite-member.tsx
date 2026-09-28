import { Avatar, Button, Form, Input, Select } from "antd";
import { DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  useDeleteMemberWorkspaceMutation,
  useGetAllMembersQuery,
  useInviteMemberMutation,
  useUpdateMemberRoleMutation,
} from "@/entities/workspaces-invite-member/api";
import { useGetMeQuery } from "@/entities/me";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import type { WorkspaceMember } from "@/entities/workspaces-invite-member/model/schema";
import { Loader } from "@/shared/ui/loader";

const ROLE_OPTIONS = [
  { value: "OWNER", label: "G'alvaning asoschisi" },
  { value: "ADMIN", label: "Zavxoz" },
  { value: "MEMBER", label: "Qora ishchi" },
  { value: "VIEWER", label: "Tomoshabin" },
];

export function KanbanInviteMember({
  workspaceId: propWorkspaceId,
}: {
  workspaceId?: string;
}) {
  const [searchParams] = useSearchParams();
  const workspaceId = propWorkspaceId || searchParams.get("workspaceId") || "";
  const [form] = Form.useForm();
  const [inviteMember, { isLoading }] = useInviteMemberMutation();
  const {
    data,
    isLoading: loadingMember,
    refetch,
  } = useGetAllMembersQuery(workspaceId, { skip: !workspaceId });
  const [deleteMemberWorkspace] = useDeleteMemberWorkspaceMutation();
  const { data: meData } = useGetMeQuery();
  const [updateMemberRole] = useUpdateMemberRoleMutation();

  const currentUserMember = data?.data?.find(
    (user: WorkspaceMember) => user?.id === meData?.data?.id,
  );
  const isOwnerOrAdmin =
    currentUserMember?.role === "OWNER" || currentUserMember?.role === "ADMIN";
  const isDisabled = !isOwnerOrAdmin;

  const handleFinish = async (values: {
    usernameOrEmail: string;
    role: string;
  }) => {
    const trimmedValue = values.usernameOrEmail?.trim();
    if (!trimmedValue) return;
    if (!workspaceId) return toast.error("Workspace topilmadi!");
    try {
      await inviteMember({
        workspaceId,
        data: {
          usernameOrEmail: trimmedValue,
          role: values.role,
        },
      }).unwrap();

      toast.success("Taklif muvaffaqiyatli yuborildi!");
      form.resetFields();
      refetch();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("Xatolik yuz berdi:", error);
      toast.error(
        error?.data?.message || "Taklif yuborishda xatolik yuz berdi!",
      );
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    if (!workspaceId) return toast.error("Workspace topilmadi!");
    try {
      await deleteMemberWorkspace({
        workspaceId,
        memberId,
      }).unwrap();
      toast.success("A'zo o'chirildi!");
      refetch();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("Xatolik yuz berdi:", error);
      toast.error(
        error?.data?.message || "A'zo o'chirishda xatolik yuz berdi!",
      );
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!workspaceId) return toast.error("Workspace topilmadi!");
    try {
      await updateMemberRole({
        workspaceId,
        userId,
        role: newRole,
      }).unwrap();
      toast.success("Rol muvaffaqiyatli o'zgartirildi!");
      refetch();
    } catch (err) {
      const error = err as { data?: { message?: string } };
      console.error("Xatolik yuz berdi:", error);
      toast.error(
        error?.data?.message || "Rolni o'zgartirishda xatolik yuz berdi!",
      );
    }
  };
  function getRoleColor(role: string) {
    switch (role.toUpperCase()) {
      case "OWNER":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      case "ADMIN":
        return "bg-blue-100 text-blue-700 border border-blue-200";
      case "MEMBER":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "VIEWER":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  }
  return (
    <div className="w-[430px] max-w-[95vw] max-h-[450px] flex flex-col rounded-2xl bg-white border border-gray-200 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.12)] text-gray-900 sora">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <UserAddOutlined className="text-2xl text-gray-900" />
        <div>
          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight leading-snug m-0">
            Bosh og'riqqa odam qo'shish
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-0">
            Laqab yoki email orqali taklif yuboring
          </p>
        </div>
      </div>

      <Form
        form={form}
        initialValues={{ role: "MEMBER" }}
        onFinish={handleFinish}
        className="mb-5 space-y-2 shrink-0"
      >
        <Form.Item
          name="usernameOrEmail"
          className="!mb-2"
          rules={[{ required: true, message: "Laqab yoki email kiriting!" }]}
        >
          <Input
            placeholder="Laqabingiz yoki email"
            disabled={isDisabled}
            className="w-full !border-gray-200 focus:!border-[#1877f2] focus:!bg-white !rounded-xl px-3.5 h-10 text-xs text-gray-900 placeholder:!text-gray-400 outline-none transition-all"
          />
        </Form.Item>

        <div className="flex items-center gap-2">
            <Form.Item name="role" className="!mb-0 flex-1">
              <Select
                options={ROLE_OPTIONS}
                popupMatchSelectWidth={140}
                disabled={isDisabled}
                className="w-full h-10"
                dropdownStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                }}
              />
            </Form.Item>

          <Form.Item className="!mb-0 shrink-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isDisabled}
              className="h-10 px-5 !bg-[#6B7280] text-white! text-xs font-semibold !rounded-xl !border-0 cursor-pointer transition-all hover:!bg-[#4a4e54] text-white!"
            >
              Taklif qilish
            </Button>
          </Form.Item>
        </div>
      </Form>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-2.5 px-1 shrink-0">
          <span className="text-sm font-semibold text-gray-900">
            Hurmatli davra qatnashchilari
          </span>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
            {data?.data?.length ?? 0}
          </span>
        </div>

        <div className="space-y-2 flex-1 overflow-y-auto overflow-x-auto min-h-0 pr-1.5 custom-scrollbar">
          {loadingMember ? (
            <Loader />
          ) : (
            data?.data?.map((member: WorkspaceMember) => {
              const displayName =
                member.fullName || member.name || member.email || "User";
              const initial = displayName[0]?.toUpperCase() || "U";
              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar
                      size={40}
                      shape="circle"
                      className={`${getRoleColor(member.role)} shrink-0 font-bold flex items-center justify-center`}
                    >
                      {initial}
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 truncate leading-tight">
                        {displayName}
                      </div>
                      <div className="text-xs text-gray-500 truncate leading-tight mt-0.5">
                        {member.email}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    <Select
                      defaultValue={member?.role}
                      options={ROLE_OPTIONS}
                      onChange={(value) => handleUpdateRole(member?.id, value)}
                      disabled={isDisabled}
                      popupMatchSelectWidth={120}
                      className="w-32 h-8 text-xs font-medium"
                      dropdownStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                      }}
                    />
                    <Button
                      type="text"
                      danger
                      onClick={() => handleDeleteMember(member?.id)}
                      icon={<DeleteOutlined className="text-sm text-red-500" />}
                      className="w-8 h-8 flex items-center justify-center !rounded-lg hover:!bg-transparent cursor-pointer"
                      title="A'zoni o'chirish"
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
