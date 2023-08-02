import React from 'react';
import './PollPreview.css'; // Import PollPreview.css

class ChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      count: 0,
      choice: "..",
      voteCount: 0,
      quesNo: 0,
      ch_id: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      users: [
        // Data will be loaded from API, but for now, it's set directly
        {
          "id": 1,
          "choice_text": "Yes",
          "votes": 2,
          "question": 1,
        },
        // Other choices...
      ],
    });
  }

  handleChange = (val, ques, choice_id, event) => {
    this.setState({
      choice: event.currentTarget.value,
      voteCount: val.votes,
      quesNo: ques.question,
      ch_id: choice_id.id,
    });
  };

  handleClick(event) {
    event.preventDefault();
    this.setState({ voteCount: this.state.voteCount + 1 }, () => {
      console.log("now", this.state.voteCount);
    });
    alert(`You chose ${this.state.choice}.`);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { isLoading } = this.state;
    return (
      <React.Fragment>
        {/* Your rendering logic here */}
      </React.Fragment>
    );
  }
}

export default ChoiceList;
