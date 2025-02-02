// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const signupUser = async (userData) => {
  try {
    const response = await api.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Signup failed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const signinUser = async (userData) => {
  try {
    const response = await api.post("/users/signin", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Signin failed:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
export const logoutUser = async () => {
  try {
    const response = await api.post("/users/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
export default api;
