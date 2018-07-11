import React, {Component} from 'react';
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";

const createRandomID = () => {
    let string = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++)
      string += possible.charAt(Math.floor(Math.random() * possible.length));
    return string;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: "001",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "002",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ],
    }
  }

  addMessage = (content) => {
    const message = {
      id: createRandomID(),
      username: this.state.currentUser.name,
      content: content
    }
    this.webSocket.send(`User ${message.username} said ${message.content}`);
    // const oldMessages = this.state.messages;
    // const newMessages = [...oldMessages, message];
    // this.setState({messages: newMessages});
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
