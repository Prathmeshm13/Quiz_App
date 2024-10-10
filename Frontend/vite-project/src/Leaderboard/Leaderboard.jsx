import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './leaderboard.css';

function Leaderboard() {
  const [allscores, setAllscores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScores, setFilteredScores] = useState([]);

  async function getScores() {
    try {
      const response = await axios.get('http://localhost:8000/allscores');
      const scores = response.data;

      const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
      
      setAllscores(sortedScores);
      setFilteredScores(sortedScores);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  }

  useEffect(() => {
    getScores();
  }, []);

  const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const user = arr[mid][0];

      if (user === target) {
        return mid;
      } else if (user < target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const index = binarySearch(allscores, term);
      if (index !== -1) {
        const startIndex = Math.max(index - 2, 0);
        const endIndex = Math.min(index + 3, allscores.length);
        setFilteredScores(allscores.slice(startIndex, endIndex));
      } else {
        setFilteredScores([]);
      }
    } else {
      setFilteredScores(allscores);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-title">Leaderboard</div>
      
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a user..."
        className="search-bar"
      />

      <div>
        <ol className="leaderboard-list">
          {filteredScores.map(([key, value]) => (
            <li key={key}>{key}: {value}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
