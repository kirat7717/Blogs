import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaImage, FaTimes } from "react-icons/fa";

import {
  createBlog,
  uploadBlogImage,
} from "../../service/blogService";
import { addBlogSchema } from "../../validation/blog.schema";

export default function AddBlog() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Create and clean image preview URL
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);

    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Basic frontend validation
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setSelectedImage(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  // Validate title and description before making any API request
  const result = addBlogSchema.safeParse(formData);

  if (!result.success) {
    setError(result.error.issues[0].message);
    return;
  }

  // Validate image before uploading it
  if (!selectedImage) {
    setError("Please upload a blog image.");
    return;
  }

  try {
    setLoading(true);

    // Upload image only after all frontend validation passes
    const imageResponse = await uploadBlogImage(selectedImage);

    const imageUrl = imageResponse.imageUrl;

    // Create blog using the uploaded image URL
    await createBlog({
      title: formData.title,
      description: formData.description,
      imageUrl,
    });

    navigate("/my-blogs");
  } catch (error) {
    console.error("Create Blog Error:", error);

    setError(
      error.response?.data?.message ||
        "Something went wrong while creating the blog."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mx-auto max-w-4xl">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Add Blog
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Share your thoughts and ideas with the community.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
      >

        {/* Title */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Blog Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your blog title"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#0083c9] focus:ring-2 focus:ring-[#0083c9]/20"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-800"
            >
              Description
            </label>

            <span className="text-xs text-gray-400">
              {formData.description.length} / 1000
            </span>
          </div>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={1000}
            rows={8}
            placeholder="Write your blog content here..."
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition focus:border-[#0083c9] focus:ring-2 focus:ring-[#0083c9]/20"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-8">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Cover Image
          </label>

          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-[#0083c9] hover:bg-gray-50"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <FaCloudUploadAlt
                  size={30}
                  className="text-[#0083c9]"
                />
              </div>

              <p className="text-sm font-semibold text-gray-700">
                Click to upload an image
              </p>

              <p className="mt-1 text-xs text-gray-400">
                PNG, JPG, JPEG up to 5 MB
              </p>

              <button
                type="button"
                className="mt-5 rounded-md bg-[#0083c9] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0070ab]"
              >
                Choose Image
              </button>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-xl border border-gray-200">
              <img
                src={previewUrl}
                alt="Blog preview"
                className="h-72 w-full object-cover"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
              >
                <FaTimes size={14} />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-4 py-3">
                <p className="truncate text-sm text-white">
                  {selectedImage?.name}
                </p>
              </div>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#0083c9] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0070ab] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}