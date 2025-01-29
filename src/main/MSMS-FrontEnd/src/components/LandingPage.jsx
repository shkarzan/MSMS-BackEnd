// components/LandingPage.js
import React from 'react';
import '../Css/LandingPage.css';
import { useNavigate} from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div className="logo"></div>
            <h1>Welcome to the Medical Store Management System</h1>
            <button className='login-button' onClick={() => navigate('/login')}>Login</button>
        </div>
    );
};

export default LandingPage;
