import BlogCardUI from "./BlogCardUI";

function BlogCard({
  blog,
  showActions = false,
  onEdit,
  onDelete,
  onNavigate,
}) {
  const handleActionClick = (e, actionFn) => {
    e.stopPropagation();

    if (actionFn) {
      actionFn(blog);
    }
  };

  return (
    <BlogCardUI
      blog={blog}
      showActions={showActions}
      onEdit={onEdit}
      onDelete={onDelete}
      onNavigate={onNavigate}
      handleActionClick={handleActionClick}
    />
  );
}

export default BlogCard;
