import React from 'react';

const PollList = ({ polls, handleVote }) => {
  return (
    <div className="poll-list">
      <h2>Active Polls</h2>
      {polls.length === 0 ? (
        <p>No active polls available.</p>
      ) : (
        polls.map((poll, index) => (
          <div className="poll-item" key={index}>
            <h3>{poll.question}</h3>
            <ul className="poll-options">
              {poll.options.map((option, optionIndex) => (
                <li key={optionIndex} className="poll-option">
                  <label>
                    <input
                      type="radio"
                      name={`poll-${index}`}
                      onChange={() => handleVote(index, optionIndex)}
                    />
                    {option.option}
                  </label>
                  <span className="poll-option-votes">{option.votes}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default PollList;
