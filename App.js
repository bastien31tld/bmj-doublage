import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function App() {
  const [pseudo, setPseudo] = useState('');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('players', setPlayers);
    return () => socket.off('players');
  }, []);

  const handleJoin = () => {
    socket.emit('join', pseudo);
  };

  return (
    <div style={{ backgroundColor: '#1a1a2e', color: 'white', padding: 20 }}>
      <h1>BMJ Doublage Lobby</h1>
      <input
        value={pseudo}
        onChange={(e) => setPseudo(e.target.value)}
        placeholder="Entrez votre pseudo"
        style={{ marginRight: 10 }}
      />
      <button onClick={handleJoin}>Rejoindre</button>
      <h2>Joueurs connectés :</h2>
      <ul>
        {players.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}
