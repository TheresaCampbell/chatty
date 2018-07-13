import React, {Component} from 'react';

class Message extends Component {
  render() {

    const usernameColor = {color: this.props.color};
    const isNotification = this.props.type === "incomingNotification";

    return (
      <div>

      {isNotification ? (
      // Notification formatting
      <div className="notification">
        <span className="notification-content">{this.props.content}</span>
      </div>

      ) : (

      // Message formatting
      <div className="message">
        <span className="message-username" style={usernameColor}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      )}

      </div>

    );
  }
}

export default Message