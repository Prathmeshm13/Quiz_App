import React, { useEffect, useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, setUserDetails } from '../../features/quiz';

function Header() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const dispatch=useDispatch();
  const [userdetails,setdetails]=useState({});
  const handleLogin = async () => {
    await loginWithRedirect({
      screen_hint: 'login',
      appState: {
        returnTo: "/", // or any other page after login
      },
    });
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/check-user?email=${email}`);
      dispatch(setUserDetails(response.data.user));
      return response.data.exists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      if (isAuthenticated && user) {
        const exists = await checkUserExists(user.email);
        setUserExists(exists);
        setLoading(false);
        if (exists) {
          dispatch(setUser(user.email));
        } else {
          navigate('/signup');
        }
      } else {
        setLoading(false);
      }
    };

    handleRedirect();
  }, [isAuthenticated, user]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking user existence
  }

  return (
    <div className='container'>
      <div className='logo'>
        <h1>Quizzo.com</h1>
      </div>
      <div className='hitems'>
        {isAuthenticated && userExists && (
          <>
            <div className='hi1'>Leaderboard</div>
            <div className='hi1'>About Us</div>
            <div className='hi1' onClick={() => navigate('/')}>Explore</div>
            <div className='hi1' onClick={() => navigate('quiz/create-quiz')}>Create Quiz</div>
            <div className='hi1' onClick={() => navigate('quiz')}>Dashboard</div>
          </>
        )}
        {!isAuthenticated && (
          <div className='profile-button' onClick={handleLogin}>
            <div>Log In</div>
          </div>
        )}
        {isAuthenticated && (
          <div className='profile-button' onClick={handleLogout}>
            <div>Log Out</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
