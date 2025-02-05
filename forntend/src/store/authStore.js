import { create } from "zustand";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api";

// Add the interceptor *outside* the useAuthStore definition,
// so it's only added once when the module is loaded.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("interceptor catch some thing");
    // Handle common errors (e.g., 401 Unauthorized, 500 Server Error)
    if (error.response?.status === 401) {
      // Redirect to login, clear local storage, etc.
      console.error("Unauthorized:", error);
      // You'll need a way to access the navigate function here.  One way is to create a separate function
      // that you can call from the interceptor, which has access to `useNavigate` through a component.
      //Example
      const logoutAction = () => {
        localStorage.removeItem("user"); // remove user from local storage to log user out
        window.location.href = "/signin"; // navigate to login page
      };
      logoutAction();
      // navigate("/signin"); // This won't work directly in the interceptor
    } else if (error.response?.status >= 500) {
      console.error("Server Error:", error);
      // Display a generic error message to the user
    } else {
      console.error("API Error:", error);
      // Handle other errors
    }
    return Promise.reject(error); // Re-throw the error so the component can handle it if needed
  }
);

const useAuthStore = create((set, get) => ({
  isLoading: false,
  error: null,
  user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from local storage
  product: null,
  products: [],
  cart: [],
  isAdmin: JSON.parse(localStorage.getItem("user"))?.role === "admin" || false, // Initialize from local storage
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
      localStorage.setItem("user", JSON.stringify(user)); // Update local storage
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
    localStorage.removeItem("user"); // Update local storage
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
