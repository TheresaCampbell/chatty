import React, {Component} from 'react';

class NavBar extends Component {
  render() {

    const isSingular = this.props.clients === 1;

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>

        {isSingular ? (
          //Singular user formatting
          <p className="user-count">{this.props.clients} user online</p>

        ) : (

          //Multiple users formatting
          <p className="user-count">{this.props.clients} users online</p>
        )}

      </nav>
    )
  }
}

export default NavBar
