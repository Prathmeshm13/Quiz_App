import React from 'react';
import './header.css';

function Header() {
    return ( 
        <div className='container'>
            <div className='logo'>
                <h1>Quizzo.com</h1>
            </div>
            <div className='hitems'>
                <div className='hi1'>Leaderboard</div>
                <div className='hi1'>About Us</div>
                <div className='hi1'>Explore</div>
                <div className='profile-button'>
                    <div>My Profile</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
