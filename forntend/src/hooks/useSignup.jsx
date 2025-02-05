// frontend/src/hooks/useSignup.jsx
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error, user } = useAuthStore(); // Get user from store
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password);

      // Navigate based on role *after* signup completes
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "seller") {
        navigate("/seller-dash");
      } else {
        navigate("/user-dash/profile");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleSignup,
    isLoading,
    error,
  };
};

export default useSignup;
