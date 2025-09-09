import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import './SocialLogin.css';

export default function SocialLogin() {
    const navigate = useNavigate();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        // Check if user is already authenticated with a valid token
        const token = localStorage.getItem('authToken');
        if (token) {
            console.log('SocialLogin - Checking existing token validity...');
            // Test the token by making a request to /api/user
            api.get('/api/user')
                .then(res => {
                    console.log('SocialLogin - Valid token found, redirecting to dashboard');
                    navigate('/dashboard');
                })
                .catch(err => {
                    console.log('SocialLogin - Invalid token, removing from storage');
                    localStorage.removeItem('authToken');
                    setIsCheckingAuth(false);
                });
        } else {
            console.log('SocialLogin - No token found');
            setIsCheckingAuth(false);
        }
    }, [navigate]);

    const handleLogin = () => {
        console.log('SocialLogin - Starting Google OAuth flow');
        // Redirect to Laravel route that starts the Google OAuth flow
        window.location.href = 'http://localhost:8000/auth/google';
    };

    if (isCheckingAuth) {
        return (
            <div className="login-container">
                <div className="login-card">
                    <div className="spinner"></div>
                    <p>Checking authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome</h1>
                    <p>Sign in to your account</p>
                </div>
                
                <div className="login-content">
                    <button onClick={handleLogin} className="google-btn">
                        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#000" fillRule="evenodd">
                                <path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"/>
                                <path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"/>
                                <path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"/>
                                <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"/>
                            </g>
                        </svg>
                        Continue with Google
                    </button>
                </div>
                
                <div className="login-footer">
                    <p>Secure authentication with Google</p>
                </div>
            </div>
        </div>
    );  
}