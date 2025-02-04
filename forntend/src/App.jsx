// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserLayout from "./Layout/UserLayout";
import UserProfile from "./pages/Profile/UserProfile";
import Category from "./components/Category/Category";
import SignUpPage from "./pages/Signup";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route path="/user-dash" element={<UserLayout />}>
          <Route path="/user-dash/profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
