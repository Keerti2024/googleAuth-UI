import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import './Dashboard.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the authenticated user's details from backend
        api.get('/api/user')
            .then(res => {
                console.log('Dashboard - User data received:', res.data);
                setUser(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Dashboard - API Error:', err.response?.data || err.message);
                setError(err.response?.data?.message || 'Authentication failed');
                setLoading(false);
                
                // If unauthorized, clear token and redirect to login
                if (err.response?.status === 401) {
                    localStorage.removeItem('authToken');
                    window.location.href = '/';
                }
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
    }

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card">
                    <div className="spinner"></div>
                    <p>Loading your profile...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card error-card">
                    <div className="error-icon">⚠️</div>
                    <h2>Something went wrong</h2>
                    <p>{error}</p>
                    <button onClick={() => window.location.href = '/'} className="back-btn">
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-card">
                    <p>No user data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="profile-header">
                    <div className="avatar-container">
                        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
                        <div className="online-indicator"></div>
                    </div>
                    <div className="user-info">
                        <h1>Welcome back, {user.name}!</h1>
                        <p className="user-email">{user.email}</p>
                    </div>
                </div>
                
                <div className="profile-content">
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">👤</div>
                            <div className="stat-info">
                                <h3>Profile</h3>
                                <p>Verified Account</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">🔒</div>
                            <div className="stat-info">
                                <h3>Security</h3>
                                <p>Google Protected</p>
                            </div>
                        </div>
                        
                        <div className="stat-card">
                            <div className="stat-icon">⚡</div>
                            <div className="stat-info">
                                <h3>Status</h3>
                                <p>Active</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="profile-actions">
                    <button onClick={handleLogout} className="logout-btn">
                        <span className="logout-icon">🚪</span>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}