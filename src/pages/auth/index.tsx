import AuthForm from "@/widgets/shared/auth/auth-form";
import { Navigate } from "react-router-dom";

export const AuthPage = () => {
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
      <AuthForm />
    </div>
  );
};
