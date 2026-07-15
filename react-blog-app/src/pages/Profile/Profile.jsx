import React from 'react';

export default function MyProfile() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto   bg-white rounded-lg shadow-sm sm:p-10">
        
        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          My Profile
        </h1>

        {/* Form Container */}
        <div className="space-y-8">
          
          {/* Profile Picture Upload Section */}
          <div className="flex items-center">
            {/* Gray Profile Icon Placeholder */}
            <div className="w-24 h-24 bg-[#c4c4c4] flex items-center justify-center flex-shrink-0">
              <svg 
                className="w-16 h-16 text-white mt-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            
            {/* Upload Button */}
            <div className="ml-6">
              <button 
                type="button" 
                className="bg-[#0083c9] hover:bg-[#0070ab] text-white text-sm font-medium py-2 px-4 rounded transition-colors"
              >
                Upload profile
              </button>
            </div>
          </div>

          {/* Name Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base font-bold text-gray-900">
              Name
            </label>
            <input 
              type="text" 
              id="name"
              placeholder="Write here" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0083c9] focus:border-transparent transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base font-bold text-gray-900">
              Email
            </label>
            <input 
              type="email" 
              id="email"
              placeholder="Write here" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0083c9] focus:border-transparent transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <button 
              type="button" 
              className="w-full bg-[#0083c9] hover:bg-[#0070ab] text-white font-semibold py-4 px-6 rounded-md transition-colors text-lg"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}