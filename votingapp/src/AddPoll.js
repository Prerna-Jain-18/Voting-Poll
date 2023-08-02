import React, { useState } from 'react';
import axios from 'axios';

const AddPoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    // Create the poll object to be sent to the backend
    const poll = {
      question,
      options: options.filter((option) => option.trim() !== ''),
    };

    // Send the poll data to the backend API
    axios.post('/api/create-poll', poll)
      .then((response) => {
        console.log('Poll created successfully:', response.data);
        // Reset the form after successful submission
        setQuestion('');
        setOptions(['', '', '', '']);
      })
      .catch((error) => {
        console.error('Error creating poll:', error);
      });
  };

  return (
    <div className="add-poll">
      <h2>Create a New Poll</h2>
      <label>Question:</label>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
      <label>Options:</label>
      {options.map((option, index) => (
        <input key={index} type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} />
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddPoll;
