import React, {Component} from 'react';

class ChatBar extends Component {
  render(){

    const onKeyPress = (event) => {
      if(event.key === 'Enter'){
        let messageInput = event.target.value;
        this.props.addMessage(messageInput);
        event.target.value = "";
      }
    }

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your name here (optional)" defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={onKeyPress} />
      </footer>
    )
  }
}

export default ChatBar