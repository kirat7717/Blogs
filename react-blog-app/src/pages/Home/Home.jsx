import React, { useEffect, useState } from "react";
import BlogCard from "../../components/BlogCard/BlogCard";
import { getAllBlogs } from "../../service/blogService";
import { useNavigate } from "react-router-dom";
function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getAllBlogs();

        setBlogs(response.data);
      } catch (error) {
        console.error("Fetch Blogs Error:", error);

        setError(error.response?.data?.message || "Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

 return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Latest Blogs</h1>

          <p className="mt-1 text-sm text-gray-500">
            Discover the latest blogs from our community.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-10 text-center text-gray-500">
            Loading blogs...
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">
            <h2 className="text-lg font-semibold text-gray-800">
              No blogs available
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              There are no blogs to display right now.
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {!loading && !error && blogs.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id || blog.id} // Added key to prevent React warnings
                blog={blog}
                onNavigate={(blog) => navigate(`/blog/${blog._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
