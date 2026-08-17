import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getSingleBlog,
  updateBlog,
  uploadBlogImage,
} from "../../service/blogService";

export default function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Fetch Existing Blog
  // =========================
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getSingleBlog(id);

        const blog = response.data;

        setFormData({
          title: blog.title || "",
          description: blog.description || "",
          imageUrl: blog.imageUrl || "",
        });

        // Show existing image
        setImagePreview(blog.imageUrl || "");
      } catch (error) {
        console.error("Edit Blog Fetch Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch blog."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // =========================
  // Title Change
  // =========================
  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  // =========================
  // Description Change
  // =========================
  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  // =========================
  // Image Change
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);

    // Create preview for selected image
    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // =========================
  // Submit / Update Blog
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Frontend validation
    if (!formData.title.trim()) {
      setError("Please enter a blog title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a blog description.");
      return;
    }

    try {
      setLoading(true);

      // Keep old image by default
      let imageUrl = formData.imageUrl;

      // Upload new image only if user selected one
      if (selectedImage) {
        const imageResponse =
          await uploadBlogImage(selectedImage);

        imageUrl = imageResponse.imageUrl;
      }

      // Update blog
      await updateBlog(id, {
        title: formData.title,
        description: formData.description,
        imageUrl,
      });

      // Go back to Blog Details
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Update Blog Error:", error);

      setError(
        error.response?.data?.message ||
          "Something went wrong while updating the blog."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Loading State
  // =========================
  if (loading && !formData.title) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 text-center text-gray-500">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-sm sm:p-10">

        {/* Page Heading */}
        <h1 className="mb-10 text-3xl font-bold text-gray-900 sm:text-4xl">
          Edit Blog
        </h1>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form Container */}
        <div className="space-y-8">

          {/* =========================
              Title
          ========================= */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-800"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              placeholder="Write here"
              value={formData.title}
              onChange={handleTitleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0083c9]"
            />
          </div>

          {/* =========================
              Description
          ========================= */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-800"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={6}
              placeholder="Write here"
              value={formData.description}
              onChange={handleDescriptionChange}
              className="w-full resize-y rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#0083c9]"
            />

            <div className="flex justify-end">
              <span className="text-xs font-medium text-gray-400">
                max 1000 words
              </span>
            </div>
          </div>

          {/* =========================
              Image Section
          ========================= */}
          <div className="flex flex-col gap-3">

            <label className="text-sm font-semibold text-gray-800">
              Blog Image
            </label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <img
                  src={imagePreview}
                  alt={formData.title || "Blog preview"}
                  className="h-72 w-full object-cover"
                />
              </div>
            )}

            {/* Upload Area */}
            <label
              htmlFor="blogImage"
              className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100"
            >
              <svg
                className="mb-3 h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11V3m0 0l-3 3m3-3l3 3"
                />
              </svg>

              <span className="text-sm font-medium text-gray-500">
                {selectedImage
                  ? "Change image"
                  : "Choose a new image"}
              </span>

              <span className="mt-1 text-xs text-gray-400">
                Leave unchanged to keep the current image
              </span>
            </label>

            {/* Actual File Input */}
            <input
              type="file"
              id="blogImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          {/* =========================
              Update Button
          ========================= */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-md bg-[#0083c9] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#0070ab] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}