// components/PollApp.js

import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import PollForm from './PollForm';
import PollList from './PollList';

const socket = socketIOClient('http://localhost:3001');

const PollApp = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    socket.on('activePolls', (activePolls) => {
      setPolls(activePolls);
    });

    socket.on('newPoll', (poll) => {
      setPolls((prevPolls) => [...prevPolls, poll]);
    });

    socket.on('pollUpdate', (updatedPoll) => {
      setPolls((prevPolls) =>
        prevPolls.map((poll) => (poll._id === updatedPoll._id ? updatedPoll : poll))
      );
    });

    socket.on('pollDelete', (deletedPollId) => {
      setPolls((prevPolls) => prevPolls.filter((poll) => poll._id !== deletedPollId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const createPoll = (question, options) => {
    const newPoll = {
      question: question,
      options: options.map((option) => ({ option: option, votes: 0 })),
    };
    socket.emit('createPoll', newPoll);
  };

  return (
    <div className="poll-app">
      <h1>Poll App</h1>
      <PollForm createPoll={createPoll} />
      <PollList polls={polls} />
    </div>
  );
};

export default PollApp;
