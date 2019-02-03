import React, { Component } from 'react';
import '../css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './Login';
import Video from './Video';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    }
  }

  handleStatus(e){
    e.preventDefault()
    this.setState({
      login: true
    })
  }
  

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={() => <Login isAuthed={this.handleStatus.bind(this)} />} />
          <Route path="/dash/" component={Video} />
        </div>
      </Router>
    );
  }
}

export default App;
