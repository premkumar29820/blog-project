import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import auth from '../../config/firebase'
import { signOut } from 'firebase/auth'




function Navbar() {
    const navigate = useNavigate()
    const [log,setLog] = useState(false)

    useEffect(()=>{
      auth.onAuthStateChanged(function(user){
        if (user){
          setLog(true)
          console.log("user logged in")
        }else{
          setLog(false)
          console.log("user logged out")
        }

      })

    },[])

    function logout ()
    {
    signOut(auth)
    }

    
  return (
    <div className='site-nav'>
        <Link className='brand-mark' to={"/home"}><span>P</span>Personal</Link>
        <div className='nav-links'>
            <Link className='nav-link' to={"/home"}>Home</Link>
            <Link className='nav-link' to={"/blogs"}>Blogs</Link>
            <Link className='nav-link'>About</Link>

            {
              log? <button className='nav-action' onClick={logout}>Logout</button>: <button className='nav-action' onClick={()=>navigate("/login")}>Login</button>
            }
            
           
        </div>
    </div>
  )
}

export default Navbar