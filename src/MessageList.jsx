import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render(){
    return (
      <main className="messages">
        {this.props.messages.map(message => (
          <Message key={message.id} username={message.username} content={message.content} type={message.type} color={this.props.color}/>
          )
        )}
      </main>
    )
  }
}

export default MessageList