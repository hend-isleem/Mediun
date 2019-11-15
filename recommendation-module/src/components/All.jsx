import React from "react";
import OneComp from "./OneComp.jsx";

class All extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      users: props.users,
      arts: props.arts
    };
  }

  random(arr) {
    var result = [];
    while (result.length < 3) {
      var randomnum = Math.floor(Math.random() * arr.length);
      if (!(result.includes(arr[randomnum]))) {
        console.log('the number was: ', randomnum)
        result.push(arr[randomnum]);
      }
    }
    return result;
  }
  
  getUserById(id) {
    return this.state.users.filter((user) =>  user.id === id);
  }

  render() {
    // console.log('in All, the users are ', this.state.users);
    // console.log('in All, the articles are ', this.state.arts);
    var randomArts = this.random(this.state.arts);
    // var randomArts = this.random(this.state.arts);
    console.log("RANDOOOOM: ", randomArts.length)
    return( <div>
      <h2 className="RECmore">More From Medium</h2>
      <div className="RECall">
        {randomArts.map(oneArt => {
          return <OneComp key={oneArt._id} art={oneArt} user={this.getUserById(oneArt.authorId)[0]}/>;
        })}
        {/* <OneComp art={randomArts[0]} users={this.state.users}/>
        <OneComp art={randomArts[1]} users={this.state.users}/>
        <OneComp art={randomArts[2]} users={this.state.users}/>  */}
      </div>
    </div>
    );
  }
}

export default All;