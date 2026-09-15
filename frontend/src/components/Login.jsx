import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  {signInWithEmailAndPassword}  from 'firebase/auth'
import auth from '../config/firebase'

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, seterr] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0);

          auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/home")
            }

        })

    }, []);

  
    const handleLogin = (e) => {
        e.preventDefault();

       signInWithEmailAndPassword (auth, email, password).then((res) => {
            console.log(res)
               navigate('/home')
        }).catch(() => {
            seterr("Error sigining in please try again")
        })

        // Redirect to homepage/dashboard after login
        // Replace '/home' with your homepage route
      
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleLogin} className="auth-form">
                <p className='eyebrow'>Welcome back</p><h2 className="display-font">Sign in.</h2>
                <div className="form-field">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="field"
                    />
                </div>
                <div className="form-field">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="field"
                    />
                </div>
                <p className='error-message'>{err}</p>
                <p className='text-link auth-switch' onClick={() => navigate("/signup")}>New user? Register here</p>
                <button type="submit" className="button-style auth-submit">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;
