import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api";

// Add the interceptor *outside* the useAuthStore definition,
// so it's only added once when the module is loaded.

const useAuthStore = create((set, get) => {
  return {
    isLoading: false,
    error: null,
    user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from local storage
    product: null,
    products: [],
    cart: [],
    isAdmin:
      JSON.parse(localStorage.getItem("user"))?.role === "admin" || false, // Initialize from local storage
    setUser: (user) => set({ user }),

    token: localStorage.getItem("token") || null,
    setToken: (token) => set({ token }),
    clearToken: () => set({ token: null }),

    login: async (email, password) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axios.post(
          `${API_BASE_URL}/users/signin`,
          { email, password },
          { withCredentials: true }
        );
        const { user } = response.data;
        localStorage.setItem("user", JSON.stringify(user)); // Update local storage
        localStorage.setItem("token", response?.data?.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response?.data?.token}`; //Update headers

        set({
          isLoading: false,
          error: null,
          user: user,
          token: response?.data?.token,
          isAdmin: user?.role === "admin",
        });

        // Redirect based on role
        if (user?.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user-dash/profile";
        }
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
        localStorage.setItem("user", JSON.stringify(user)); // Update local storage
        localStorage.setItem("token", response?.data?.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response?.data?.token}`; //Update headers

        set({
          isLoading: false,
          error: null,
          user: user,
          isAdmin: user?.role === "admin",
          token: response?.data?.token,
        });
        // Redirect based on role
        if (user?.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user-dash/profile";
        }
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
      localStorage.removeItem("user"); // Update local storage
      localStorage.removeItem("token");
      axios.defaults.headers.common["Authorization"] = null;
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
  };
});

export { useAuthStore };
//Interceptor
const axiosInterceptor = (store) => {
  axios.interceptors.request.use(
    (config) => {
      const token = store.getState().token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export { axiosInterceptor };
