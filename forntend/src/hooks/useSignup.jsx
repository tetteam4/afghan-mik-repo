// frontend/src/hooks/useSignup.jsx
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useAuthStore(); // Get signup function from store
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(username, email, password); // Pass name, email, and password
      navigate("/");
    } catch (err) {
      // Error is already handled by the store, but you might want to add specific error handling here.
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
