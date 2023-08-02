// components/PollForm.js

import React, { useState } from 'react';

const PollForm = ({ createPoll }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);

  const handleSubmit = (e) => {
    e.preventDefault();
    const optionList = options.filter((option) => option.trim() !== '');
    createPoll(question, optionList);
    setQuestion('');
    setOptions(['', '', '', '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <div className="poll-form">
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        <label htmlFor="options">Options:</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollForm;
