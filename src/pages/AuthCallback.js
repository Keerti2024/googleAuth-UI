import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthCallback.css';

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        
        console.log('AuthCallback - Current URL:', window.location.href);
        console.log('AuthCallback - Token received:', token);
        
        if (token) {
            localStorage.setItem('authToken', token);
            console.log('AuthCallback - Token saved, redirecting to dashboard');
            // redirect to dashboard
            setTimeout(() => {
                navigate('/dashboard');
            }, 1500); // Small delay for better UX
        } else {
            console.log('AuthCallback - No token found, redirecting to login');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    }, [navigate]);

    return (
        <div className="callback-container">
            <div className="callback-card">
                <div className="success-animation">
                    <div className="checkmark-circle">
                        <div className="checkmark"></div>
                    </div>
                </div>
                <h2>Authentication Successful!</h2>
                <p>You're being redirected to your dashboard...</p>
                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>
            </div>
        </div>
    );
}