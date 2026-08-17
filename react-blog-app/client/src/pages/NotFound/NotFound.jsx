import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Warning Icon Graphic */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#0083c9]/10">
          <svg 
            className="h-12 w-12 text-[#0083c9]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Text Content */}
        <div>
          <h1 className="text-8xl sm:text-9xl font-extrabold text-gray-900 tracking-tight">
            404
          </h1>
          <p className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            Page not found
          </p>
          <p className="mt-4 text-base text-gray-500">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you may have mistyped the URL.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <Link  to='/'
            type="button" 
            className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-[#0083c9] hover:bg-[#0070ab] transition-colors shadow-sm"
          >
            Back
          </Link>
        </div>

      </div>
    </div>
  );
}