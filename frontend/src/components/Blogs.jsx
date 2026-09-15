import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from "axios"
import Footer from './common/Footer';
import auth from '../config/firebase'
function Blogs() {

    const [blogs, setBlogs] = useState([]);
    const [admin,setAdmin] = useState ([false])

    useEffect(() => {
        window.scrollTo(0, 0);
    
        auth.onAuthStateChanged(function(user){
        if (user){

            if(user.uid ==="YYtJflClGyayZz8rln6841CkLIA3")
            {
                setAdmin(true)
            }else{
                setAdmin(false)
            }
      
         
        }else{
          
          console.log("user logged out")
        }

      })

        axios.get("http://localhost:5000/api/blogs").then((res) => {
            console.log(res.data)
            setBlogs(res.data)
        }).catch(() => {
            console.log("Error fetching data")
        })
    }, [])



    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');


    const handleLike = async (blog_id) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`);
            // After successfully updating the likes count in the backend, fetch the updated list of blogs
            if (response.status === 200) {
                axios.get("http://localhost:5000/api/blogs").then((res) => {
                    console.log(res.data)
                    setBlogs(res.data)
                }).catch(() => {
                    console.log("Error fetching data")
                })
            }
        } catch (error) {
            console.error('Error liking the blog post:', error);
        }
    };

    const handleNewBlogSubmit = (event) => {
        event.preventDefault(); // Prevent form from refreshing the page
        const today = new Date();
        const date = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


        const likes = 0
        axios.post("http://localhost:5000/api/blogs", { newTitle, date, newContent, likes }).then((res) => {
            console.log(res.data)

            axios.get("http://localhost:5000/api/blogs").then((res) => {
                console.log(res.data)
                setBlogs(res.data)
            }).catch(() => {
                console.log("Error fetching data")
            })

        });




        setNewTitle('');
        setNewContent('');
    };

    return (
        <div className="blog-section page-content">
            <div className='page-heading'><p className='eyebrow'>The journal</p><h1 className='display-font'>Latest <em>notes.</em></h1><p>Ideas, lessons, and observations from the workbench.</p></div>

            {/* Blog creation form */}

        {admin?
            <div className="blog-creation-form mb-8" style={{ width: "80%", margin: "auto" }}>
                <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                    <textarea
                        placeholder="Blog Content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="p-2 border rounded"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600">
                        Add Blog
                    </button>
                </form>
            </div>:""
            }

            <div className="blogs-container blog-grid">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post">
                        <p className="blog-date">{blog.date}</p>
                        <h3 className="blog-title">{blog.newTitle}</h3>
                        <p className="blog-content">{blog.newContent}</p>
                        <div className='blog-meta'><span className="text-link" onClick={() => handleLike(blog._id)}>Like</span><span>{blog.likes} Likes</span></div>
                    </div>
                ))}
            </div>

            <Footer/>
        </div>
    );
}

export default Blogs
