// frontend/src/hooks/useSignin.jsx
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, user } = useAuthStore(); // Get user from store
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      // Navigate based on role *after* login completes
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "seller") {
        navigate("/seller-dash");
      } else {
        navigate("/user-dash/profile");
      }
    } catch (err) {
      console.error("Signin failed:", err);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSignin,
    isLoading,
    error,
  };
};

export default useSignin;
