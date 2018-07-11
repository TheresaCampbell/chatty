import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    }
  }

  addMessage = (content) => {
    const message = {
      username: this.state.currentUser.name,
      content: content
    }
    this.webSocket.send(JSON.stringify(message));
  }


  componentDidMount() {
    console.log("componentDidMount <App />");

    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
      }, 3000);

    this.webSocket = new WebSocket("ws://localhost:3001/");

    this.webSocket.onopen = (event) => {
      console.log("Connected to server");
    };

  }

  render() {
    console.log("Rendering App");
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage}/>
      </div>
    );
  }
}
export default App;
