import React from 'react';
import ChoiceList from './ChoiceList.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SingleQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.AboutQs = this.AboutQs.bind(this);
  }

  AboutQs() {
    return (
      <div>
        <h6>Click to display Choices</h6>
      </div>
    );
  }

  render() {
    const qid = this.props.question.id;
    return (
      <Router>
        <div>
          <Link to="/choice">Go to Choices</Link>
          <Link to="/about">{this.props.question.title}</Link>
          <hr />
          <Route path="/choice" component={this.AboutQs} />
          <Route exact path="/about" component={() => <ChoiceList qs_id={qid} />} />
        </div>
      </Router>
    );
  }
}

export default SingleQuestion;
