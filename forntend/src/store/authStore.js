// frontend/src/store/authStore.js
import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api"; // Replace with your actual backend URL

const useAuthStore = create((set, get) => ({
  isLoading: false,
  error: null,
  user: null,
  setUser: (user) => set({ user }),
  //Session Token management
  token: localStorage.getItem("token") || null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),

  // Authentication Functionalities
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/signin`,
        { email, password },
        { withCredentials: true }
      );
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      set({ isLoading: false, error: null, user: user });
    } catch (err) {
      set({
        isLoading: false,
        error:
          err?.response?.data?.message ||
          "An unexpected error occurred during login.",
        user: null,
      });
    }
  },
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      set({ isLoading: false, error: null, user: user });
    } catch (err) {
      set({
        isLoading: false,
        error:
          err?.response?.data?.message ||
          "An unexpected error occurred during signup.",
        user: null,
      });
    }
  },
  logout: async () => {
    set({ isLoading: false, error: null, user: null, token: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  },
  getProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      set({ products: response.data, isLoading: false, error: null });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },
  getProductById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      set({ product: response.data, isLoading: false, error: null });
      return response.data;
    } catch (error) {
      set({ isLoading: false, error: error.response.data.message });
    }
  },
}));

export { useAuthStore };
