import React from 'react'
import logoIcon from "../../../assets/images/logo/logo-icon.svg";
import logoText from "../../../assets/images/logo/logo-text.svg";

function ForgetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      
      {/* Card Container */}
      <div className="w-full max-w-[400px] rounded-xl bg-white p-8 shadow-sm border border-gray-100">
        
        {/* Logo Section */}
        <div className="mb-3 flex justify-center items-center gap-1">
          <img src={logoIcon} alt="Icon" className="h-8 w-auto object-contain" />
          <img src={logoText} alt="Blogs" className="h-5 w-auto object-contain" />
        </div>

        {/* Heading Section */}
        <div className="mb-4">
          <h2 className="text-[22px] font-semibold text-gray-800">
            Forgot password
          </h2>
          {/* Note: Corrected the typo from the design image ("you" -> "your") */}
          <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
            Please enter your email
          </p>
        </div>

        {/* Form Section (UI Only - using div to prevent default submissions) */}
        <div className="flex flex-col gap-5">
          
          {/* Email Field */}
          <div>
            <label className="mb-1 block text-[13px] font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-[14px] text-gray-800 outline-none transition-all focus:border-[#0083c9] focus:ring-1 focus:ring-[#0083c9]"
            />
          </div>

          {/* Send Button */}
          <button
            type="button"
            className="w-full rounded-lg bg-[#0083c9] py-2 text-[15px] font-semibold text-white transition-colors hover:bg-sky-600 focus:outline-none"
          >
            Send
          </button>
          
        </div>

      </div>
    </div>
  )
}

export default ForgetPassword