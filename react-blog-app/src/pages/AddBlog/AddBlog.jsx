import React from 'react';

export default function AddBlog() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-10">
        
        {/* Page Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-10">
          Add Blog
        </h1>

        {/* Form Container */}
        <div className="space-y-8">
          
          {/* Title Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold text-gray-800">
              Title
            </label>
            <input 
              type="text" 
              id="title"
              placeholder="Write here" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0083c9] focus:border-transparent transition-colors"
            />
          </div>

          {/* Description Field */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-800">
              Description
            </label>
            <textarea 
              id="description"
              rows={6}
              placeholder="Write here" 
              className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0083c9] focus:border-transparent transition-colors resize-y"
            />
            <div className="flex justify-end">
              <span className="text-xs text-gray-400 font-medium">max 1000 words</span>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-800">
              Upload Image
            </label>
            <div className="w-full h-72 border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg flex flex-col items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer">
              {/* Image Icon with Upload Arrow */}
              <svg 
                className="w-16 h-16 text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11V3m0 0l-3 3m3-3l3 3" />
              </svg>
              <span className="text-lg font-medium text-gray-500">
                Upload here
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
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