import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("this.props: ", this.props.clients);
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user-count">{this.props.clients} users online</p>
      </nav>
    )
  }
}

export default NavBar