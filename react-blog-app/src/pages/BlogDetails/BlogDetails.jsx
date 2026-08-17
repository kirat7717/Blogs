import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {
  getSingleBlog,
  getAllBlogs,
} from "../../service/blogService";
import { useSelector } from "react-redux";
import BlogCard from "../../components/BlogCard/BlogCard";
function BlogDetails() {
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getSingleBlog(id);

        setBlog(response.data);
        const blogsResponse = await getAllBlogs();

        const otherBlogs = blogsResponse.data
          .filter((item) => item._id !== id)
          .slice(0, 3);

        setRelatedBlogs(otherBlogs);
      } catch (error) {
        console.error("Blog Details Error:", error);
        setError(
          error.response?.data?.message || "Failed to fetch blog details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">Loading blog...</div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Calculate isOwner HERE, after we are 100% sure 'blog' is loaded and not null
  const isOwner = user?.id?.toString() === blog.authorId?._id?.toString();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* --- Main Content Area --- */}
        <main className="lg:col-span-8">
          {/* --- Circular Back Button --- */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            title="Go Back"
            className="mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-200 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0083c9] focus:ring-offset-2">
            <FiArrowLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Header Section */}
          <header className="mb-8">
            {/* Blog Title */}
            <h1 className="mb-6 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              {blog.title}
            </h1>

            {/* Author Info & Edit Button Row */}
            <div className="mb-8 flex items-center justify-between">
              <div className="flex items-center space-x-4 text-gray-600">
                {/* Profile Placeholder */}
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                  <img
                    src="https://placehold.co/100x100?text=Profile"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Written by {blog.authorId?.username || "Unknown Author"}
                  </p>

                  <div className="mt-0.5 flex items-center space-x-2 text-sm">
                    <span>
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    <span>&middot;</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              {/* Conditional Edit Button for Owner */}
              {isOwner && (
                <button
                  type="button"
                  onClick={() => navigate(`/edit-blog/${blog._id}`)}
                  className="inline-flex items-center gap-2 rounded-md bg-[#0083c9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0070ab]">
                  Edit Blog
                </button>
              )}
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10 overflow-hidden rounded-xl">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full object-cover"
            />
          </div>

          {/* Blog Content */}
          <article className="space-y-6 text-base leading-relaxed text-gray-700">
            <p className="whitespace-pre-line">{blog.description}</p>
          </article>
        </main>

        {/* --- Sidebar Area --- */}
        <aside className="lg:col-span-4">
          <div>
            <h3 className="mb-6 inline-block border-b-2 border-[#0083c9] pb-1 text-lg font-bold text-gray-900">
              More Like This
            </h3>

            {/* Related Blogs */}
            <div className="flex flex-col gap-6">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={blog}
                    onNavigate={(blog) => navigate(`/blog/${blog._id}`)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  No related blogs available.
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default BlogDetails;
