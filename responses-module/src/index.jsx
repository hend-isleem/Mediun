/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List.jsx';
import '../public/style.css';

class Responses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'empty'
    };
    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    this.updateContent();
  }

  updateContent() {
    const that = this;
    this.eventSource = new EventSource(
      'https://young-river-75124.herokuapp.com/stream'
    );
    this.eventSource.onopen = () => {
      console.log('es open');
    };
    this.eventSource.onerror = () => {
      console.log('no response');
    };
    this.eventSource.onmessage = (result) => {
      console.log(result);
      console.log(JSON.parse(result.data));
      // example
      const { email } = JSON.parse(result.data)[0];
      console.log(email);
      that.setState({ text: email });
    };
  }

  render() {
    return (
      <div>
        <h1>Hello From Responses</h1>
        <h1>{this.state.text}</h1>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<Responses />, document.getElementById('responses'));
