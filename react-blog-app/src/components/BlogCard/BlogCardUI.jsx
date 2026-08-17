import { FiEdit2, FiTrash2 } from "react-icons/fi";

function BlogCardUI({
  blog,
  showActions = false,
  onEdit,
  onDelete,
  onNavigate,
  handleActionClick,
}) {
  return (
    <article className="flex flex-col rounded-xl bg-white border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {blog.authorId?.username || "Unknown Author"}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Posted{" "}
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : ""}
          </p>
        </div>
      </div>

      <div
        className="group cursor-pointer flex-grow"
        onClick={() => onNavigate && onNavigate(blog)}
      >
        <div className="overflow-hidden rounded-xl mb-4 aspect-[4/3] w-full">
          <img
            src={
              blog.imageUrl ||
              "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80"
            }
            alt={blog.title || "Blog Thumbnail"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h2 className="mb-2 text-base font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors duration-200 group-hover:text-[#0083c9]">
          {blog.title}
        </h2>

        <p className="text-sm leading-snug text-gray-600 line-clamp-3">
          {blog.description}
        </p>
      </div>

      {showActions && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={(e) => handleActionClick(e, onEdit)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 rounded-lg transition-colors hover:bg-blue-50 hover:text-[#0083c9]"
            aria-label="Edit blog"
          >
            <FiEdit2 className="w-4 h-4" />
            Edit
          </button>

          <button
            onClick={(e) => handleActionClick(e, onDelete)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-500 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600"
            aria-label="Delete blog"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      )}
    </article>
  );
}

export default BlogCardUI;
