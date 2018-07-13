import React, {Component} from 'react';

class ChatBar extends Component {
  render(){

    const handleMessage = (event) => {
      if(event.key === 'Enter'){
        let messageInput = event.target.value;
        this.props.addMessage(messageInput);
        event.target.value = "";
      }
    }

    const handleChangeUsername = (event) => {
      if(event.key === 'Enter') {
        let usernameInput = event.target.value;
        this.props.updateUsername(usernameInput);
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your name + hit ENTER" onKeyPress={handleChangeUsername} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={handleMessage} />
      </footer>
    )
  }
}

export default ChatBar