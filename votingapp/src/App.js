import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import './App.css'; // Import the CSS file


const socket = socketIOClient('http://localhost:5000'); // Replace with your backend URL

function App() {
  const [polls, setPolls] = useState([]);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState('');

  useEffect(() => {
  // Fetch existing polls from the backend
  axios.get('http://localhost:5000/api/polls')
    .then((response) => {
      setPolls(response.data);
    })
    .catch((error) => {
      console.error('Error fetching polls:', error);
    });

  // Event listener for newPoll event
  socket.on('newPoll', (newPoll) => {
    setPolls([...polls, newPoll]);
  });

  // Event listener for vote event
  socket.on('vote', (updatedPoll) => {
    const updatedPolls = polls.map((poll) => {
      if (poll._id === updatedPoll._id) {
        return updatedPoll;
      }
      return poll;
    });
    setPolls(updatedPolls);
  });
}, [polls]);


  const handleCreatePoll = () => {
    // Create a new poll and emit the event to the server
    const options = newPollOptions.split(',').map((option) => option.trim());
    const newPoll = { question: newPollQuestion, options };
    axios.post('http://localhost:5000/api/polls', newPoll)
      .then((response) => {
        setPolls([...polls, response.data]);
        socket.emit('newPoll', response.data);
      })
      .catch((error) => {
        console.error('Error creating poll:', error);
      });

    // Clear the input fields after creating the poll
    setNewPollQuestion('');
    setNewPollOptions('');
  };

  const handleVote = (pollId, optionIndex) => {
    // Cast a vote for a poll option and emit the event to the server
    axios.post(`http://localhost:5000/api/polls/${pollId}/vote`, { optionIndex })
      .then((response) => {
        const updatedPolls = polls.map((poll) => {
          if (poll._id === response.data._id) {
            return response.data;
          }
          return poll;
        });
        setPolls(updatedPolls);
        socket.emit('vote', response.data);
      })
      .catch((error) => {
        console.error('Error casting vote:', error);
      });
  };

  return (
    <div>
      <h1>Polling App</h1>

      {/* Create a new poll */}
      <div>
        <h2>Create a New Poll</h2>
        <input
          type="text"
          placeholder="Poll Question"
          value={newPollQuestion}
          onChange={(e) => setNewPollQuestion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Option 1, Option 2, ..."
          value={newPollOptions}
          onChange={(e) => setNewPollOptions(e.target.value)}
        />
        <button onClick={handleCreatePoll}>Create Poll</button>
      </div>

      {/* Display existing polls */}
      <div>
        <h2>Polls</h2>
        {polls.map((poll) => (
          <div key={poll._id}>
            <h3>{poll.question}</h3>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>
                  {option}
                  <button onClick={() => handleVote(poll._id, index)}>Vote</button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
