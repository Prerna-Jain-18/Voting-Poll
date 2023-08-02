import React from 'react';

class PollForm extends React.Component {
  state = {
    question: '',
    options: ['', '', ''],
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleOptionChange = (index, event) => {
    const { value } = event.target;
    this.setState((prevState) => {
      const updatedOptions = [...prevState.options];
      updatedOptions[index] = value;
      return { options: updatedOptions };
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { question, options } = this.state;
    if (question.trim() === '' || options.some((option) => option.trim() === '')) {
      alert('Please enter a question and all options.');
      return;
    }

    this.props.onSubmit({ question, options });
    this.setState({
      question: '',
      options: ['', '', ''],
    });
  };

  render() {
    const { question, options } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              name={`option-${index}`}
              value={option}
              onChange={(event) => this.handleOptionChange(index, event)}
            />
          ))}
        </div>
        <button type="submit">Create Poll</button>
      </form>
    );
  }
}

export default PollForm;
