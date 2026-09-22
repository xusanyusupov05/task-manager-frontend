import { Form, Input, Button, Typography, Flex, Image } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { useRegisterUserMutation } from "@/entities/auth/api";
import { useLazyGetMeQuery } from "@/entities/me";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/app/loginSlice";
import { toast } from "sonner";

interface ApiErrorResponse {
  data?: {
    message?: string;
  };
  message?: string;
}

interface RegisterFormValues {
  username: string;
  password: string;
}

const logo = "/assets/images-removebg-preview.png";

export default function AuthForm() {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [getMe, { isLoading: isMeLoading }] = useLazyGetMeQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      const response = await registerUser({
        name: values.username,
        password: values.password,
      }).unwrap();

      const { token, user } = response?.data || {};

      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("token", token);
      }

      let fullName = user?.fullName;
      try {
        const meRes = await getMe().unwrap();
        fullName = meRes?.data?.fullName;
      } catch {
        console.log("Profil ma'lumotlarni olishda xatolik");
      }

      const displayName = fullName || user?.name || values.username;

      if (token) {
        dispatch(setCredentials({ user: displayName, token }));
      }

      toast.success(
        `Bitta siz kam edinggiz keling ${displayName[0].toUpperCase() + displayName.slice(1)}!`,
        {
          position: "top-right",
        },
      );
      navigate(ROUTE_PATH.HOME);
    } catch (error) {
      console.error(error);
      const apiError = error as ApiErrorResponse;
      const message =
        apiError?.data?.message ||
        apiError?.message ||
        "Ro'yxatdan o'tishda xatolik yuz berdi!";
      toast.error(message, {
        position: "top-right",
      });
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
              placeholder="Kim deb chaqiraylik ?"
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
              loading={isLoading || isMeLoading}
              htmlType="submit"
              className="w-full h-12 rounded-xl bg-slate-900 !border-0 text-white font-medium text-lg sora shadow-md shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              Davradan joy oling
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center relative z-10 flex flex-col items-center">
          <Link
            to={ROUTE_PATH.LOGIN}
            className="sora text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors duration-300 flex items-center gap-2 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Eski tanishlar davrasiga</span>
          </Link>
        </div>
      </div>
    </>
  );
}
