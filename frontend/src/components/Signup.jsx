import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import auth from '../config/firebase'

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook from React Router for navigation

  useEffect (() => {
      auth.onAuthStateChanged(function (user) {
            if (user) {
                navigate("/login")
            }

        })

  }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(auth,email,password).then((res)=>{
            console.log(res)
        }).catch(()=>{
            console.log("Failed to add user")
        })

        // Simulate user registration process
        console.log('User registered:', { email, password });
        // After registration, redirect to the login page
        navigate('/login'); // Replace '/login' with your login page route
    };

    return (
        <div className="auth-page">
            <form onSubmit={handleSubmit} className="auth-form">
                <p className='eyebrow'>Start creating</p><h2 className="display-font">Join the journal.</h2>
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
                <div className="form-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="field"
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <p className='text-link auth-switch' onClick={() => navigate("/login")}>Already have an account? Login here</p>
                <button type="submit" className="button-style auth-submit">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Signup;
