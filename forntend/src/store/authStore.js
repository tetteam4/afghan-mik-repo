import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = "http://localhost:8000/api"; // Replace with your actual backend URL

const useAuthStore = create((set, get) => ({
  isLoading: false,
  error: null,
  user: null,
  product: null, // Single product detail
  products: [], // All Products
  cart: [],
  isAdmin: false, // Initial value
  setUser: (user) => set({ user }),

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
      set({
        isLoading: false,
        error: null,
        user: user,
        isAdmin: user?.role === "admin",
      });
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
  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      const { user } = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      set({
        isLoading: false,
        error: null,
        user: user,
        isAdmin: user?.role === "admin",
      });
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
    set({
      isLoading: false,
      error: null,
      user: null,
      token: null,
      isAdmin: false,
    });
    const response = await axios.post(
      `${API_BASE_URL}/users/logout`,
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  getProducts: async (searchQuery) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/products?${searchQuery}`
      );
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
  // Cart Functionalities
  addToCart: (product, quantity) => {
    set((state) => {
      const itemInCart = state.cart.find(
        (item) => item.productId === product.id
      );
      if (itemInCart) {
        const updatedCart = state.cart.map((item) => {
          if (item.productId === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          } else {
            return item;
          }
        });
        return { ...state, cart: updatedCart };
      } else {
        return {
          ...state,
          cart: [
            ...state.cart,
            { productId: product.id, quantity, price: product.price },
          ],
        };
      }
    });
  },

  removeFromCart: (productId) => {
    set((state) => ({
      ...state,
      cart: state.cart.filter((item) => item.productId !== productId),
    }));
  },
  clearCart: () => {
    set((state) => ({ ...state, cart: [] }));
  },
}));

export { useAuthStore };
