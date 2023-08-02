import React, { useState } from 'react';
import './App.css';
import PollForm from './components/PollForm';
import PollList from './components/PollList';

const App = () => {
  const [polls, setPolls] = useState([]);

  const createPoll = (question, options) => {
    const newPoll = {
      question: question,
      options: options.map((option) => ({ option, votes: 0 })),
    };
    setPolls([...polls, newPoll]);
  };

  const handleVote = (pollIndex, optionIndex) => {
    const updatedPolls = [...polls];
    updatedPolls[pollIndex].options[optionIndex].votes++;
    setPolls(updatedPolls);
  };

  return (
    <div className="container">
      <div className="poll-form">
        {/* Create Poll section */}
        <h1 className="app-header">Voting Poll App</h1>
        <PollForm createPoll={createPoll} />
      </div>
      <div className="poll-list">
        {/* Active Polls section */}
        <PollList polls={polls} handleVote={handleVote} />
      </div>
    </div>
  );
};

export default App;
