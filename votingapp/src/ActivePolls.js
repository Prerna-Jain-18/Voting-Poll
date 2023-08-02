import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivePolls = () => {
  const [activePolls, setActivePolls] = useState([]);

  useEffect(() => {
    // Fetch active polls from backend API
    axios.get('/api/active-polls')
      .then((response) => {
        setActivePolls(response.data);
      })
      .catch((error) => {
        console.error('Error fetching active polls:', error);
      });
  }, []);

  return (
    <div className="active-polls">
      <h2>Active Polls</h2>
      {activePolls.map((poll) => (
        <div key={poll._id} className="poll-item">
          <h3>{poll.question}</h3>
          <ul>
            {poll.options.map((option) => (
              <li key={option._id}>{option.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ActivePolls;
