import { Button, Form, Input, Select } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useInviteMemberMutation } from "@/entities/workspaces-invite-member/api";

interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";
  avatarClass: string;
}

const MEMBERS: Member[] = [
  {
    id: "1",
    name: "Aziz Karimov",
    email: "aziz.karimov@mail.uz",
    initials: "AK",
    role: "ADMIN",
    avatarClass: "bg-blue-100 text-blue-700 border border-blue-200",
  },
  {
    id: "2",
    name: "Malika Yusupova",
    email: "malika.y@mail.uz",
    initials: "MY",
    role: "OWNER",
    avatarClass: "bg-purple-100 text-purple-700 border border-purple-200",
  },
  {
    id: "3",
    name: "Sardor Toshmatov",
    email: "sardor.t@mail.uz",
    initials: "ST",
    role: "MEMBER",
    avatarClass: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  },
  {
    id: "4",
    name: "Nilufar Rashidova",
    email: "nilufar.r@mail.uz",
    initials: "NR",
    role: "VIEWER",
    avatarClass: "bg-orange-100 text-orange-700 border border-orange-200",
  },
];

const ROLE_OPTIONS = [
  { value: "OWNER", label: "Owner" },
  { value: "ADMIN", label: "Admin" },
  { value: "MEMBER", label: "Member" },
  { value: "VIEWER", label: "Viewer" },
];

export function KanbanInviteMember({ workspaceId }: { workspaceId?: string }) {
  const [form] = Form.useForm();
  const [inviteMember, { isLoading }] = useInviteMemberMutation();

  const handleFinish = async (values: { usernameOrEmail: string; role: string }) => {
    if (values.usernameOrEmail.trim() === '') return

    if (workspaceId) {
      try {
        await inviteMember({ workspaceId, ...values }).unwrap();
        form.resetFields();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-[430px] max-w-[95vw] rounded-2xl bg-white border border-gray-200 p-5 shadow-[0_20px_45px_rgba(0,0,0,0.12)] text-gray-900 sora">
      <div className="flex items-center gap-3 mb-4">
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
        className="mb-6 space-y-2"
      >
        <Form.Item
          name="usernameOrEmail"
          className="!mb-2"
          rules={[{ required: true, message: "Laqab yoki email kiriting!" }]}
        >
          <Input
            placeholder="Laqabingiz yoki email"
            className="w-full bg-[#f8fafc] !border-gray-200 focus:!border-[#1877f2] focus:!bg-white !rounded-xl px-3.5 h-10 text-xs text-gray-900 placeholder:!text-gray-400 outline-none transition-all"
          />
        </Form.Item>

        <div className="flex items-center gap-2">
          <Form.Item name="role" className="!mb-0 flex-1">
            <Select
              options={ROLE_OPTIONS}
              popupMatchSelectWidth={140}
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
              className="h-10 px-5 !bg-[#1877f2] hover:!bg-[#166fe5] text-white text-xs font-semibold !rounded-xl !border-0 cursor-pointer transition-all active:scale-95 shadow-md shadow-blue-500/20"
            >
              Taklif qilish
            </Button>
          </Form.Item>
        </div>
      </Form>

      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-sm font-semibold text-gray-900">
            Workspace a'zolari
          </span>
          <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
            {MEMBERS.length}
          </span>
        </div>

        <div className="space-y-2">
          {MEMBERS.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${member.avatarClass}`}
                >
                  {member.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate leading-tight">
                    {member.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate leading-tight mt-0.5">
                    {member.email}
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <Select
                  defaultValue={member.role}
                  options={ROLE_OPTIONS}
                  popupMatchSelectWidth={120}
                  className="w-24 h-8 text-xs font-medium"
                  dropdownStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
