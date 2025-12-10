// src/pages/Login.jsx (Revised)

import React, { useState } from 'react';
import '../Login.css';
import { auth, googleProvider } from '../firebase.jsx';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signInWithRedirect
} from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState(null);

    const handleEmailPasswordAuth = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        try {
            await signInWithRedirect(auth, googleProvider);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>Welcome to the Tracker</h1>
                <p>Please log in or register to save your data.</p>
                
                {/* ----------------- Google Sign-In ----------------- */}
                <button 
                    onClick={handleGoogleSignIn} 
                    className="google-btn"
                >
                    Sign In with Google
                </button>

                <div className="divider">
                    <hr />
                    <span>OR</span>
                    <hr />
                </div>

                {/* ----------------- Email/Password Form ----------------- */}
                <form onSubmit={handleEmailPasswordAuth} className="email-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    <button type="submit" className="email-btn">
                        {isRegister ? 'Register' : 'Log In'}
                    </button>
                </form>

                {/* ----------------- Switch Mode ----------------- */}
                <button 
                    className="mode-toggle-btn"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? 'Already have an account? Log In' : 'Need an account? Register'}
                </button>
            </div>
        </div>
    );
}

export default Login;