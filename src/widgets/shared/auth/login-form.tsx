import { Form, Input, Button, Typography, Flex, Image } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useLoginUserMutation } from "@/entities/auth/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/loginSlice";
import { toast } from "sonner";

interface LoginFormValues {
  username: string;
  password: string;
}

const logo = "/assets/images-removebg-preview.png";

export default function LoginForm() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await loginUser({
        name: values.username,
        password: values.password,
      }).unwrap();

      const token =
        (typeof response?.data === "string" ? response.data : null) ||
        response?.data?.token ||
        response?.data?.accessToken ||
        response?.token ||
        response?.accessToken;

      const user =
        response?.data?.user ||
        response?.user ||
        (typeof response?.data === "object" ? response?.data : null);

      if (!token) {
        toast.error("Kirish muvaffaqiyatli, lekin serverdan token olinmadi!");
        return;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("token", token);
      dispatch(
        setCredentials({ user: user?.name ?? values.username, token }),
      );
      toast.success("Xush kelibsiz! Tizimga muvaffaqiyatli kirdingiz.");
      navigate(ROUTE_PATH.HOME);
    } catch (error: unknown) {
      console.error(error);
      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message ||
        err?.message ||
        "Kirishda xatolik yuz berdi. Ism yoki parolni tekshiring!";
      toast.error(message);
    }
  };

  return (
    <>
      <div className="w-full max-w-md px-8 py-10 sm:px-10 sm:py-12 rounded-[2rem] bg-white border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden group">
        <Flex
          align="center"
          justify="center"
          gap={12}
          className="mb-2 relative z-10"
        >
          <Image
            src={logo}
            width={80}
            height={80}
            alt="logo"
            preview={false}
            className="object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
          />
          <Typography.Text className="rubik text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Choylashamiz
          </Typography.Text>
        </Flex>

        <p className="sora text-slate-500 text-center text-sm sm:text-base mb-8 font-normal relative z-10">
          Bir piyola choy ustida
        </p>

        <Form
          layout="vertical"
          onFinish={onFinish}
          className="w-full relative z-10"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Davraga kimsiz ozi? Ismni yozib kiring.",
              },
            ]}
            className="mb-5"
          >
            <Input
              type="text"
              placeholder="Kim deb chaqirardik ?"
              prefix={<UserOutlined className="text-slate-400 text-lg mr-2" />}
              className="sora text-base py-3 px-4 rounded-xl bg-gray-50 border-gray-200 text-slate-800 placeholder:text-slate-400 hover:bg-white hover:border-blue-400 focus:bg-white focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] transition-all duration-300"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Quloqqa aytiladigan sozni unutdingizmi yoki ozimizdan emasmisiz?",
              },
            ]}
            className="mb-8"
          >
            <Input.Password
              placeholder="Quloqqa aytiladigan so'z"
              prefix={<LockOutlined className="text-slate-400 text-lg mr-2" />}
              className="sora text-base py-3 px-4 rounded-xl bg-gray-50 border-gray-200 text-slate-800 placeholder:text-slate-400 hover:bg-white hover:border-blue-400 focus:bg-white focus:border-blue-500 focus:shadow-[0_0_0_2px_rgba(59,130,246,0.2)] transition-all duration-300"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              loading={isLoading}
              htmlType="submit"
              className="w-full h-12 rounded-xl bg-slate-900 !border-0 text-white font-medium text-lg sora shadow-md shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Davraga qo'shilish
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center relative z-10 flex flex-col items-center">
          <Link
            to={ROUTE_PATH.AUTH}
            className="sora text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors duration-300 flex items-center gap-2 group"
          >
            <span>Yangi mehmon</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
