// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/Signup";
// import EmailVerificationPage from "./pages/EmailVerificationPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import UserLayout from "./Layout/UserLayout";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<UserLayout/>}>
          <Route path="/user-dash" element={<UserDashboard/>} />
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/emailVerification" element={<EmailVerificationPage />} />
        <Route path="/rest-password" element={<ResetPasswordPage />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
