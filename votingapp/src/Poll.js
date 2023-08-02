import React from 'react';

class Poll extends React.Component {
  state = {
    selectedOption: '',
  };

  votePercentage = (voteCount) => {
    const totalVotes = this.props.votes.reduce((sum, voteCount) => sum + voteCount, 0);
    return totalVotes === 0 ? 0 : ((voteCount / totalVotes) * 100).toFixed(2);
  };

  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedOption } = this.state;
    if (selectedOption) {
      const optionIndex = this.props.options.indexOf(selectedOption);
      if (optionIndex !== -1) {
        const updatedVotes = [...this.props.votes];
        updatedVotes[optionIndex]++;
        this.props.onVote(updatedVotes);
      }
      this.setState({
        selectedOption: '',
      });
    }
  };

  render() {
    const { question, options, votes } = this.props;
    const totalVotes = votes.reduce((sum, voteCount) => sum + voteCount, 0);

    return (
      <div className="poll">
        <h3>{question}</h3>
        <form onSubmit={this.handleSubmit}>
          {options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="option"
                value={option}
                checked={this.state.selectedOption === option}
                onChange={this.handleOptionChange}
              />
              {option} ({votes[index]} votes | {this.votePercentage(votes[index])}%)
            </label>
          ))}
          <button type="submit" disabled={!this.state.selectedOption}>
            Vote
          </button>
        </form>
      </div>
    );
  }
}

export default Poll;
