import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./common/Footer";
import auth from "../config/firebase";


const API_BASE_URL = "http://localhost:10000";

const API = `${API_BASE_URL.replace(/\/$/, "")}/api`;


const placeholderBlogs = [
  {
    date: "May 18, 2024",
    newTitle: "Start with a clear idea",
    newContent:
      "The best digital work often begins with a simple question and enough room to explore it.",
    likes: 0,
  },
  {
    date: "May 9, 2024",
    newTitle: "Notes from the workbench",
    newContent:
      "A collection of small lessons, useful references, and experiments in progress.",
    likes: 0,
  },
  {
    date: "April 27, 2024",
    newTitle: "Make space for better work",
    newContent:
      "Good process creates the focus needed to turn thoughtful ideas into useful experiences.",
    likes: 0,
  },
];

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [admin, setAdmin] = useState(false);

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");


  const fetchBlogs = async () => {
    try {
      setError("");

      const response = await axios.get(`${API}/blogs`);

      const existingBlogs = response.data || [];

  
      if (existingBlogs.length === 0) {
        const savedPlaceholderBlogs = [];

        for (const blog of placeholderBlogs) {
          try {
            const createResponse = await axios.post(
              `${API}/blogs`,
              {
                newTitle: blog.newTitle,
                newContent: blog.newContent,
                date: blog.date,
                likes: 0,
              }
            );

            if (createResponse.data) {
              savedPlaceholderBlogs.push(createResponse.data);
            }
          } catch (seedError) {
            console.error(
              "Error saving initial blog:",
              seedError
            );
          }
        }

        if (savedPlaceholderBlogs.length > 0) {
          setBlogs(savedPlaceholderBlogs);
        } else {
          setBlogs([]);
          setError(
            "Unable to save the initial blogs. Please check the backend."
          );
        }

        return;
      }

      
      setBlogs(existingBlogs);
    } catch (fetchError) {
      console.error("Error fetching blogs:", fetchError);

      setBlogs([]);

      setError(
        fetchError.response?.data?.message ||
          "Unable to load blogs. Please check your backend server."
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        
        if (user.uid === "YYtJflClGyayZz8rln6841CkLIA3") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }
    });

    fetchBlogs();

    return () => {
      unsubscribe();
    };
  }, []);


  const handleLike = async (blogId) => {
    try {
      const response = await axios.patch(
        `${API}/blogs/like/${blogId}`
      );

      if (response.status === 200) {
        setBlogs((currentBlogs) =>
          currentBlogs.map((blog) =>
            blog._id === blogId ? response.data : blog
          )
        );
      }
    } catch (likeError) {
      console.error(
        "Error liking the blog post:",
        likeError
      );

      setError(
        likeError.response?.data?.message ||
          "Unable to like this blog post."
      );
    }
  };


  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();

    const title = newTitle.trim();
    const content = newContent.trim();

    if (!title || !content) {
      setError("A title and content are required.");
      return;
    }

    const today = new Date();

    const date = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/blogs`, {
        newTitle: title,
        newContent: content,
        date,
        likes: 0,
      });

      if (response.data) {
        setBlogs((currentBlogs) => [
          response.data,
          ...currentBlogs,
        ]);

        setNewTitle("");
        setNewContent("");
      }
    } catch (submitError) {
      console.error(
        "Error creating blog:",
        submitError
      );

      setError(
        submitError.response?.data?.message ||
          "Unable to save the blog. Please check the backend."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog-section page-content">
      {/* Page heading */}
      <div className="page-heading">
        <p className="eyebrow">The journal</p>

        <h1 className="display-font">
          Latest <em>notes.</em>
        </h1>

        <p>
          Ideas, lessons, and observations from the workbench.
        </p>
      </div>

      {/* Admin blog creation form */}
      {admin && (
        <div
          className="blog-creation-form mb-10"
          style={{
            width: "80%",
            maxWidth: "900px",
            margin: "0 auto 40px",
          }}
        >
          <form
            onSubmit={handleNewBlogSubmit}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Blog Title"
              value={newTitle}
              onChange={(event) =>
                setNewTitle(event.target.value)
              }
              className="p-2 border rounded"
              required
            />

            <textarea
              placeholder="Blog Content"
              value={newContent}
              onChange={(event) =>
                setNewContent(event.target.value)
              }
              className="p-2 border rounded"
              rows={5}
              required
            />

            {error && (
              <p
                className="error-message"
                role="alert"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button-style"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Add blog"}
            </button>
          </form>
        </div>
      )}

      {/* General error */}
      {!admin && error && (
        <p
          className="error-message"
          role="alert"
          style={{
            width: "80%",
            maxWidth: "900px",
            margin: "0 auto 30px",
          }}
        >
          {error}
        </p>
      )}

      {/* Blog list */}
      <div className="blogs-container blog-grid">
        {!blogs.length && !error && (
          <p className="blog-status">
            No blog posts yet.
          </p>
        )}

        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-post"
          >
            <p className="blog-date">
              {blog.date}
            </p>

            <h3 className="blog-title">
              {blog.newTitle}
            </h3>

            <p className="blog-content">
              {blog.newContent}
            </p>

            <div className="blog-meta">
              <button
                type="button"
                className="text-link"
                onClick={() =>
                  handleLike(blog._id)
                }
              >
                Like
              </button>

              <span>
                {blog.likes || 0} Likes
              </span>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

<<<<<<< HEAD
export default Blogs;
=======
export default Blogs;
>>>>>>> f417f929297d24362c38ec792fa7fc6d9f43f78f
