import React from 'react';
import './Result.css';
import { useNavigate } from 'react-router-dom';

function Result(props) {
    const navigate=useNavigate();
  return (
    <div className="result-container">
      <h2 className="result-title">Quiz Result</h2>
      <p className="result-score">Your Score: <strong>{props.score}</strong> out of <strong>{props.totalscore}</strong></p>
      <button onClick={()=>navigate('/')}>Go to Home Page</button>
    </div>
  );
}

export default Result;
