import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // Check if the user is logged in (you can use local storage or context API)
    const isLoggedIn = localStorage.getItem('user') ? true : false;

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome Back!</h1>
                    <p>Ready to shop? Click below to get started.</p>
                </div>
            ) : (
                <div>
                    <h1>Welcome to KVH General Store!</h1>
                    <p>Start shopping now and explore our amazing products.</p>
                </div>
            )}
            <Link to="/products">
                <button style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#54473F', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Start Shopping
                </button>
            </Link>
        </div>
    );
};

export default HomePage;