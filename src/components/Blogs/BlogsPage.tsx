// BlogsPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { dummyBlogs } from "../../constants/blog.constant"; // Import the constant

const BlogsPage: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dummyBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
            <p className="text-sm text-gray-500 mb-4">By {blog.author} on {blog.date}</p>
            <p className="text-gray-700 mb-4">{blog.excerpt}</p>
            <Link
              to={`/news-and-blogs/${blog.id}`}
              className="text-blue-600 hover:text-blue-800 font-semibold mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
