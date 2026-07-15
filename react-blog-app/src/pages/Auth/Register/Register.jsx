import React from "react";
import logoIcon from "../../../assets/images/logo/logo-icon.svg";
import logoText from "../../../assets/images/logo/logo-text.svg";
import { FaRegEye } from "react-icons/fa6";


function Register() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
        {/* Card Container */}
        <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-sm border border-gray-100">
          {/* Logo Section */}
          <div className="mb-6 flex justify-center items-center gap-1">
            <img
              src={logoIcon}
              alt="Icon"
              className="h-8 w-auto object-contain"
            />
            <img
              src={logoText}
              alt="Blogs"
              className="h-5 w-auto object-contain"
            />
          </div>

          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-[22px] font-semibold text-gray-800">
              Adventure starts here 🚀
            </h2>
            <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
              Create your account and start your blogging journey
            </p>
          </div>

          {/* Form Section (Converted to div for UI phase) */}
          <div className="flex flex-col gap-4">
            {/* Username Input */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] text-gray-800 outline-none transition-all focus:border-[#0083c9] focus:ring-1 focus:ring-[#0083c9]"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] text-gray-800 outline-none transition-all focus:border-[#0083c9] focus:ring-1 focus:ring-[#0083c9]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-[14px] text-gray-800 outline-none transition-all focus:border-[#0083c9] focus:ring-1 focus:ring-[#0083c9]"
                />
                {/* Static Eye Icon */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaRegEye size={16} />
                </div>
              </div>
            </div>

            {/* Agreement Section */}
            <div className="mt-1 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#0083c9] focus:ring-[#0083c9] cursor-pointer"
              />
              <span className="text-[13px] text-gray-600">
                I agree to{" "}
                <span className="cursor-pointer text-[#0083c9] hover:underline">
                  privacy policy & terms
                </span>
              </span>
            </div>

            {/* Role Section */}
            <div className="mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#0083c9] focus:ring-[#0083c9] cursor-pointer"
              />
              <span className="text-[13px] text-gray-600">
                Sign Up as{" "}
                <span className="cursor-pointer text-[#0083c9] hover:underline">
                  Admin
                </span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="mt-2 w-full rounded-lg bg-[#0083c9] py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-sky-600 focus:outline-none"
            >
              Sign Up
            </button>
          </div>

          {/* Footer Link Section */}
          <p className="mt-6 text-center text-[13px] text-gray-600">
            Already have an account?{" "}
            <span className="cursor-pointer text-[#0083c9] hover:underline">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
