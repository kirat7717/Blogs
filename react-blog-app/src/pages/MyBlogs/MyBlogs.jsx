import React from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  return (
    <main className="bg-gray-50/50 min-h-screen py-12">
      {/* Central Wrapper: This forces the header and grid to align perfectly */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Blogs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all your published blogs.
            </p>
          </div>

          {/* Add Blog Button */}
          <button className="bg-[#0083c9] hover:bg-[#0070ab] text-white font-medium py-2 px-6 rounded-md transition-colors w-full sm:w-auto">
          <Link to="/add-blog">Add Blog</Link>   
          </button>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>

      </div>
    </main>
  );
}