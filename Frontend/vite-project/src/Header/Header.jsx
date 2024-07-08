import React from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
function Header() {
    let navigate=useNavigate();
    return ( 
        <div className='container'>
            <div className='logo'>
                <h1>Quizzo.com</h1>
            </div>
            <div className='hitems'>
                <div className='hi1'>Leaderboard</div>
                <div className='hi1'>About Us</div>
                <div className='hi1' onClick={()=>navigate('/')}>Explore</div>
                <div className='hi1' onClick={()=>navigate('quiz/create-quiz')}>Create Quiz</div>
                <div className='profile-button' onClick={()=>navigate('login')}>
                    <div>Log In</div>
                </div>
            </div>
        </div>
    );
}

export default Header;
