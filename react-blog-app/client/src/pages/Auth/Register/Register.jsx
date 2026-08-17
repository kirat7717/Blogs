import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import logoIcon from "../../../assets/images/logo/logo-icon.svg";
import logoText from "../../../assets/images/logo/logo-text.svg";

import { registerUser } from "../../../service/authService";
import { registerSchema } from "../../../validation/auth.schema";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(registerSchema),
});

  const onSubmit = async (data) => {
    try {
      setServerError("");

      console.log("Register Data:", data);

      const response = await registerUser(data);

      console.log("Register Response:", response);

      // We will add navigation/toast here after
      // successful registration.
      reset();

      navigate("/login");
    } catch (error) {
      console.error("Register Error:", error);

      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 409) {
        setServerError(message || "Email already exists.");
        return;
      }

      if (status === 400) {
        setServerError(message || "Please check your entered details.");
        return;
      }

      setServerError(message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      {/* Card Container */}
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {/* Logo Section */}
        <div className="mb-8 flex items-center gap-2">
          <img src={logoIcon} alt="Logo Icon" className="h-8 w-8" />

          <img src={logoText} alt="Logo" className="h-7 w-auto" />
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-[22px] font-semibold text-gray-800">
            Adventure starts here 🚀
          </h2>

          <p className="mt-2 text-[13px] leading-relaxed text-gray-500">
            Create your account and start your blogging journey
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {serverError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-[13px] font-medium text-gray-700">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className={`w-full rounded-lg border px-4 py-2.5 text-[14px] text-gray-800 outline-none transition-all focus:ring-1 ${
                errors.username
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:border-[#0083c9] focus:ring-[#0083c9]"
              }`}
            />

            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium text-gray-700">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full rounded-lg border px-4 py-2.5 text-[14px] text-gray-800 outline-none transition-all focus:ring-1 ${
                errors.email
                  ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-gray-200 focus:border-[#0083c9] focus:ring-[#0083c9]"
              }`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-[14px] text-gray-800 outline-none transition-all focus:ring-1 ${
                  errors.password
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400"
                    : "border-gray-200 focus:border-[#0083c9] focus:ring-[#0083c9]"
                }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? (
                  <FaRegEyeSlash size={16} />
                ) : (
                  <FaRegEye size={16} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Agreement */}
          <div className="mt-1 flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#0083c9] focus:ring-[#0083c9]"
            />

            <span className="text-[13px] text-gray-600">
              I agree to{" "}
              <span className="cursor-pointer text-[#0083c9] hover:underline">
                privacy policy & terms
              </span>
            </span>
          </div>

          {/* Admin */}
          <div className="mb-2 flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 cursor-pointer rounded border-gray-300 text-[#0083c9] focus:ring-[#0083c9]"
            />

            <span className="text-[13px] text-gray-600">
              Sign Up as{" "}
              <span className="cursor-pointer text-[#0083c9] hover:underline">
                Admin
              </span>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-[#0083c9] py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-sky-600 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60">
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-[13px] text-gray-600">
          Already have an account?{" "}
          <span className="cursor-pointer text-[#0083c9] hover:underline">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
