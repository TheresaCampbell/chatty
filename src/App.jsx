import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

const randomColor = require('random-color');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Anonymous",
        color: randomColor().hexString()
      },
      messages: [],
      numberOfClients: 0,
    }
  }

  //When a user posts a message, the message is sent to the server to be broadcast to all users.
  addMessage = (data) => {
    const message = {
      type: "postMessage",
      username: this.state.currentUser.name,
      color: this.state.currentUser.color,
      content: data
    }
    this.webSocket.send(JSON.stringify(message));
  }

  //When a user updates their name, the new name is sent to the server to be broadcast to all users. App's state is also updated.
  updateUsername = (data) => {
    if (data === "") {
      data = "Anonymous";
    }

    const message = {
      type: "postNotification",
      content: `${this.state.currentUser.name} changed their name to ${data}.`
    }

    this.webSocket.send(JSON.stringify(message));

    this.setState({currentUser: {name: data, color: this.state.currentUser.color}});
  }

  //A connection with the WebSocket Server is only opened once the elements within render() have mounted.
  componentDidMount() {
    this.webSocket = new WebSocket("ws://localhost:3001/");

    this.webSocket.onopen = (event) => {
    };

    this.webSocket.addEventListener("message", this.receiveMessage);
  }

  //Upon receiving a message from the server, App state is updated based on the message type.
  receiveMessage = event => {
    const message = JSON.parse(event.data);

    switch(message.type) {
      case "clients":
        this.setState({
          numberOfClients: message.numberOfClients
        });
        break;
      default:
         this.setState(prevState => ({
          ...prevState,
          messages: prevState.messages.concat(message)
         }))
    }
  }

  render() {
    return (
      <div>
      <NavBar clients={this.state.numberOfClients}/>
      <MessageList messages={this.state.messages} />
      <ChatBar addMessage={this.addMessage} updateUsername={this.updateUsername}/>
      </div>
    );
  }
}
export default App;
