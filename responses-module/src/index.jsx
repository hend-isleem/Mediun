import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import List from "./components/List.jsx";
import "../public/style.css";
class Responses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Hello From Responses</h1>
        <List />
      </div>
    );
  }
}

ReactDOM.render(<Responses />, document.getElementById("responses"));
