import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../../assets/images/logo/logo-icon.svg";
import logoText from "../../../assets/images/logo/logo-text.svg";

import { login } from "../../../store/slices/authSlice";
import { loginUser } from "../../../service/authService";
import { loginSchema } from "../../../validation/auth.schema";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    try {
      const response = await loginUser(formData);

      const { user, token } = response.data;

      // Save token in Local Storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // Update Redux Store
      dispatch(login({user,token}),
      );
      console.log("✅ Dispatched Login");
      console.log("API User:", user);
      
      console.log("User from API:", user);
      console.log("Login Successful");
      

      // Navigate to Home Page
      navigate("/");
    } catch (error) {
      console.log("Complete Error:", error);
      console.log("error.response:", error.response);
      console.log("error.request:", error.request);
      console.log("error.message:", error.message);

      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("Server is not responding. Please try again.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  // login ui
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-[400px] rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-center gap-1">
            <img src={logoIcon} alt="Logo" className="h-8 w-auto" />

            <img src={logoText} alt="Blogs" className="h-5 w-auto" />
          </div>

          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-gray-800">
              Welcome to Blogs! 👋
            </h2>

            <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
              Please sign in to your account and start the adventure
            </p>
          </div>

          {/* Form Starts */}
          <form onSubmit={handleSubmit}>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
                Email or Username
              </label>

              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email or username"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-[#0083c9]"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>
              )}
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-[#0083c9]"
              />

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password[0]}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" />

                <span className="cursor-pointer text-[13px] text-gray-600">
                  Remember Me
                </span>
              </label>

              <button
                type="button"
                className="text-[13px] font-medium text-[#0083c9] hover:underline">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-6 w-full cursor-pointer rounded-lg bg-[#0083c9] py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-sky-600">
              Login
            </button>
          </form>
          {/* Form Ends */}

          <p className="mt-6 text-center text-[14px] text-gray-600">
            New on our platform?
            <button
              onClick={() => console.log("Button Clicked")}
              type="button"
              className="ml-1 cursor-pointer font-medium text-[#0083c9] hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
