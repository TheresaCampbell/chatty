const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const PORT = 3001;
const uuid = require('uuid/v4');
// const randomColor = require('random-color');

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//Function that broadcasts incoming messages to all users.
wss.broadcast = (data, ws) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};


// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  const numberOfClientsConnected = {
      type: "clients",
      numberOfClients: wss.clients.size
      // color: randomColor().hexString()
    };

  wss.broadcast(JSON.stringify(numberOfClientsConnected));

  ws.on('message', (message) => {
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

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    const numberOfClientsConnected = {
      id: uuid(),
      type: "clients",
      numberOfClients: wss.clients.size
    }

    wss.broadcast(JSON.stringify(numberOfClientsConnected));
  });
});
