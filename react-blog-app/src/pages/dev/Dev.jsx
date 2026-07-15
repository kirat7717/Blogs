import React from "react";
import { Link } from "react-router-dom";

function Dev() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          🚀 Development Panel
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Public Pages */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Public Pages
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                to="/"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Home
              </Link>

              <Link
                to="/blog/1"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Blog Details
              </Link>
            </div>
          </div>

          {/* Auth Pages */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Auth Pages
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Register
              </Link>

              <Link
                to="/forgetpassword"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          {/* Private Pages */}
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Private Pages
            </h2>

            <div className="flex flex-col gap-3">
              <Link
                to="/my-blogs"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                My Blogs
              </Link>

              <Link
                to="/add-blog"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Add Blog
              </Link>

              <Link
                to="/edit-blog/1"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Edit Blog
              </Link>

              <Link
                to="/profile"
                className="rounded-lg border p-3 hover:border-[#0083c9] hover:text-[#0083c9]"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dev;