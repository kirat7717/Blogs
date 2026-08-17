import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import {
  getMyBlogs,
  deleteBlog,
} from "../../service/blogService";
import { Link, useNavigate } from "react-router-dom";

export default function MyBlogs() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Delete loading state
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyBlogs();

        setBlogs(response.data);
      } catch (error) {
        console.error("My Blogs Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch your blogs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  // =========================
  // Delete Blog
  // =========================
  const handleDelete = async (blog) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setDeletingId(blog._id);

      await deleteBlog(blog._id);

      // Remove deleted blog from UI
      setBlogs((currentBlogs) =>
        currentBlogs.filter(
          (item) => item._id !== blog._id
        )
      );
    } catch (error) {
      console.error("Delete Blog Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete the blog."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* =========================
            Header Section
        ========================= */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Blogs
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage all your published blogs.
            </p>
          </div>

          {/* Add Blog Button */}
          <Link
            to="/add-blog"
            className="w-full rounded-md bg-[#0083c9] px-6 py-2 text-center font-medium text-white transition-colors hover:bg-[#0070ab] sm:w-auto"
          >
            Add Blog
          </Link>
        </div>

        {/* =========================
            Error
        ========================= */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =========================
            Loading
        ========================= */}
        {loading && (
          <div className="py-10 text-center text-gray-500">
            Loading your blogs...
          </div>
        )}

        {/* =========================
            Empty State
        ========================= */}
        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No blogs yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              You haven't created any blogs yet.
            </p>

            <Link
              to="/add-blog"
              className="mt-5 inline-block rounded-md bg-[#0083c9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0070ab]"
            >
              Create Your First Blog
            </Link>
          </div>
        )}

        {/* =========================
            Blogs Grid
        ========================= */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                showActions
                onNavigate={(blog) =>
                  navigate(`/blog/${blog._id}`)
                }
                onEdit={(blog) =>
                  navigate(`/edit-blog/${blog._id}`)
                }
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}