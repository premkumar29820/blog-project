import Home from "./components/Home";
import Blogs from "./components/Blogs";
import About from "./components/About";
import Navbar from "./components/common/Navbar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import Welcome from "./components/Welcome";
import auth from "./config/firebase";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
  }, []);

  if (authLoading) {
    return null;
  }

  return (
    <div className="page-shell">
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Welcome/>}></Route>
      <Route path="/home" element={<ProtectedRoute user={user}><Home/></ProtectedRoute>}></Route>
      <Route path="/blogs" element={<ProtectedRoute user={user}><Blogs/></ProtectedRoute>}></Route>
      <Route path="/about" element={<ProtectedRoute user={user}><About/></ProtectedRoute>}></Route>
      <Route path="/contact" element={<ProtectedRoute user={user}><Contact/></ProtectedRoute>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    </Routes>

    </BrowserRouter>
   </div>
  );
}

export default App;
