const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

let players = [];

io.on('connection', (socket) => {
  console.log('Nouvelle connexion:', socket.id);

  socket.on('join', (pseudo) => {
    socket.pseudo = pseudo;
    players.push(pseudo);
    io.emit('players', players);
  });

  socket.on('disconnect', () => {
    players = players.filter((p) => p !== socket.pseudo);
    io.emit('players', players);
  });
});

server.listen(5000, () => {
  console.log('Serveur lancé sur le port 5000');
});
