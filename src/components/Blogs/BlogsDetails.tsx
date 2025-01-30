// BlogDetailPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { dummyBlogs } from "../../constants/blog.constant"; // Import the constant

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the blog ID from the URL
  const blog = dummyBlogs.find((b) => b.id.toString() === id);

  if (!blog) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Blog Main Content */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">{blog.title}</h1>
        <p className="text-sm text-gray-500 mb-6">By {blog.author} on {blog.date}</p>

        {/* Blog Content Section */}
        <div className="text-gray-800 space-y-6">
          <p className="text-lg leading-relaxed">{blog.excerpt}</p> {/* Displaying full content */}
        </div>
      </div>

      {/* Back to Blogs Button */}
      <div className="text-center mt-8">
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => window.history.back()}
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetailPage;
