import LoginForm from "@/widgets/shared/auth/login-form";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
      <LoginForm />
    </div>
  );
};
