// frontend/src/hooks/useSignin.jsx
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      // Error is already handled by the store, but you might want to add specific error handling here.
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
