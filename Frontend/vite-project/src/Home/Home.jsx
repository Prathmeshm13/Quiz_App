import React from 'react';
import './home.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function Home() {
const navigate=useNavigate();
  function handleClick(){
    navigate("/explore")
  }
  return (
    <div className="App">
      <p className='mhead'>"Challenge Yourself:Take Our Exciting Quizzes Now!"</p>
      <p className='shead'>Explore a Variety of Topics, Sharpen Your Skills, and Compete with Friends</p>
      <button onClick={handleClick}>Explore</button>
    </div>
  );
}

export default Home;
