import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";

class Recommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello From Recommendation</h1>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<Recommendation />, document.getElementById("recommendation"));
