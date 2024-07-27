import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './leaderboard.css';  // Import the CSS file

function Leaderboard() {
  const [allscores, setAllscores] = useState([]);

  async function getScores() {
    try {
      const response = await axios.get('http://localhost:8000/allscores');
      const scores = response.data;

      // Convert the object to an array of key-value pairs and sort by score in descending order
      const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a);

      setAllscores(sortedScores);
      console.log(sortedScores);  // Log the sorted scores
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  }

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-title">Leaderboard</div>
      <div>
        <ol className="leaderboard-list">
          {allscores.map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
