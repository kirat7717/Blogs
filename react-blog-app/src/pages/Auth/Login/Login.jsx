import React from "react";

import logoIcon from "../../../assets/images/logo/logo-icon.svg";
import logoText from "../../../assets/images/logo/logo-text.svg";
function Login() {
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
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
              Email or Username
            </label>

            <input
              type="text"
              placeholder="Enter your email or username"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-[#0083c9]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] outline-none focus:ring-1 focus:ring-[#0083c9]"
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" />

              <span className="text-[13px] text-gray-600 cursor-pointer">Remember Me</span>
            </label>

            <button className="text-[13px] font-medium text-[#0083c9] hover:underline">
              Forgot Password?
            </button>
          </div>
          <button className="mt-6 w-full rounded-lg bg-[#0083c9] py-2.5 text-[15px] font-semibold text-white hover:bg-sky-600 transition-colors cursor-pointer">
            Login
          </button>
          <p className="mt-6 text-center text-[14px] text-gray-600">
            New on our platform?
            <button className="ml-1 font-medium text-[#0083c9] hover:underline cursor-pointer">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
