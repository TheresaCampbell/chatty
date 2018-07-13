const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const PORT = 3001;
const uuid = require('uuid/v4');

// Create a new express server.
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder.
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Function that broadcasts incoming data to all users.
wss.broadcast = (data, client) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Callback that runs when a client connects to the server. When a client connects they are assigned a socket, represented by the client parameter in the callback.
wss.on('connection', (client) => {
  const numberOfClientsConnected = {
      type: "clients",
      numberOfClients: wss.clients.size
    };

  wss.broadcast(JSON.stringify(numberOfClientsConnected));

  //Callback that runs when the server receives a message from the App component.
  client.on('message', (message) => {
    const receivedMessage = JSON.parse(message);

    switch(receivedMessage.type) {
      case "postMessage":
        receivedMessage.type = "incomingMessage";
        break;
      case "postNotification":
        receivedMessage.type = "incomingNotification";
        break;
      default:
        throw new Error("Unknown event type: ", receivedMessage.type);
    }

    receivedMessage.id = uuid();

    wss.broadcast(JSON.stringify(receivedMessage));

  })

  // Callback for when a client closes the socket.
  client.on('close', () => {
    const numberOfClientsConnected = {
      id: uuid(),
      type: "clients",
      numberOfClients: wss.clients.size
    }

    wss.broadcast(JSON.stringify(numberOfClientsConnected));
  });
});
