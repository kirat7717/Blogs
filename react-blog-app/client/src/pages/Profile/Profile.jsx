import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile, updateProfile } from "../../service/userService";
import { updateUser } from "../../store/slices/authSlice";
export default function MyProfile() {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch current profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();
        console.log("GET PROFILE RESPONSE:", response);


        setProfile({
          username: response.data.username || "",
          email: response.data.email || "",
          profileImage: response.data.profileImage || "",
        });
      } catch (error) {
        console.error("Profile Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to fetch profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle username and email changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // Handle profile update
  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("username", profile.username);
      formData.append("email", profile.email);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      // Call backend
      const response = await updateProfile(formData);

      // Update Redux user
      dispatch(updateUser(response.data));

      // Update local profile
      setProfile({
        username: response.data.username || "",
        email: response.data.email || "",
        profileImage: response.data.profileImage || "",
      });

      // Clear selected image
      setSelectedImage(null);
      setImagePreview("");

      setSuccess(
        response.message || "Profile updated successfully."
      );
    } catch (error) {
      console.error("Update Profile Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Show newly selected image first.
  // Otherwise show the existing image.
  const displayedImage =
    imagePreview || profile.profileImage;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account information
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* Profile Card */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-200 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-5">

              {/* Profile Image */}
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                {displayedImage ? (
                  <img
                    src={displayedImage}
                    alt={profile.username || "Profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      className="h-14 w-14 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {loading ? "Loading..." : profile.username}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {loading ? "Loading..." : profile.email}
                </p>

                {/* Upload Profile Button */}
                <label
                  htmlFor="profileImage"
                  className="mt-3 inline-block cursor-pointer rounded-md bg-[#0083c9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0070ab]"
                >
                  {selectedImage
                    ? "Change Image"
                    : "Upload Profile"}
                </label>

                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="px-6 py-8 sm:px-8">

            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Account Information
            </h3>

            <div className="space-y-6">

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  disabled={loading || saving}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#0083c9] focus:ring-2 focus:ring-[#0083c9]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  disabled={loading || saving}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-[#0083c9] focus:ring-2 focus:ring-[#0083c9]"
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t border-gray-200 bg-gray-50 px-6 py-5 sm:px-8">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || saving}
              className="rounded-lg bg-[#0083c9] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0070ab] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}