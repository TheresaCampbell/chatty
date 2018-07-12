import React, {Component} from 'react';
import NavBar from "./NavBar.jsx";
import MessageList from "./MessageList.jsx";
import Message from "./Message.jsx";
import ChatBar from "./ChatBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "Anonymous",
      messages: []
    }
  }

  addMessage = (data) => {
    const message = {
      type: "postMessage",
      username: this.state.currentUser,
      content: data
    }
    console.log("postMessage: ", message);
    this.webSocket.send(JSON.stringify(message));
  }

  updateUsername = (data) => {
    if (data === "") {
      data = "Anonymous";
    }

    const message = {
      type: "postNotification",
      content: `${this.state.currentUser} changed their name to ${data}.`
    }
    this.webSocket.send(JSON.stringify(message));
    this.setState({currentUser: data});
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    //   }, 3000);

    this.webSocket = new WebSocket("ws://localhost:3001/");

    this.webSocket.onopen = (event) => {
      console.log("Connected to server");
    };

    this.webSocket.addEventListener("message", this.receiveMessage);
  }

  receiveMessage = event => {
    const message = JSON.parse(event.data);

    this.setState(prevState => ({
      ...prevState,
      messages: prevState.messages.concat(message)
    }))
    console.log("messages: ", this.state.messages);
  }

  render() {
    console.log("Rendering App");
    return (
      <div>
      <NavBar/>
      <MessageList messages={this.state.messages}/>
      <ChatBar addMessage={this.addMessage} updateUsername={this.updateUsername}/>
      </div>
    );
  }
}
export default App;
