// frontend/src/store/authStore.js
import { create } from "zustand";
import { signupUser, signinUser } from "../services/api";
import { useNavigate } from "react-router-dom";
const useAuthStore = create((set, get) => ({
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await signinUser({ email, password });
      localStorage.setItem("token", res.token);
      set({ isLoading: false, error: null });
    } catch (err) {
      set({ isLoading: false, error: err.message });
    }
  },
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await signupUser({ email, password, name });
      localStorage.setItem("token", res.token);
      set({ isLoading: false, error: null });
    } catch (err) {
      set({ isLoading: false, error: err.message });
    }
  },
}));

export { useAuthStore };
