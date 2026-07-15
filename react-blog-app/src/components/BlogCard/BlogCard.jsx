import React from "react";

function BlogCard() {
  return (
    <>
          {/* Single Blog Card */}
          <article className="flex flex-col bg-white p-5 rounded-2xl shadow-sm border border-gray-100 max-w-sm">
            {/* 1. Author Info Row */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                alt="Kathryn Murphy"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h4 className="text-[15px] font-bold text-gray-900 leading-tight">
                  Kathryn Murphy
                </h4>
                <span className="text-[11px] font-medium text-gray-400">
                  Posted 2 days ago • Via Android
                </span>
              </div>
            </div>

            {/* 2. Blog Thumbnail */}
            <img
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80"
              alt="Blog Thumbnail"
              className="w-full aspect-[4/3] object-cover rounded-xl mb-4"
            />

            {/* 3. Blog Text Snippet */}
            <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-3">
              In The Vibrant World Of Wellness, Countless Elements Shape Our
              Physical And Mental States. From The...
            </p>
          </article>
         
      
    </>
  );
}

export default BlogCard;
