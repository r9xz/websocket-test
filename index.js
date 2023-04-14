const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const connectedSteamIDs = new Set();

wss.on('connection', function connection(ws) {
  console.log('New client connected');

  ws.on('message', function incoming(message) {
    console.log('Received message:', message);
    connectedSteamIDs.add(message);

    // Broadcast the incoming message to all connected clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });

  ws.send('connection successful');
});
