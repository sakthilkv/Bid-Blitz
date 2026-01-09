const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:3000' },
});

app.use(cors());
app.use(express.json());

const rooms = new Map();

function genID() {
  return Math.random().toString(36).slice(2, 8);
}
/* ---------- HTTP ---------- */

app.post('/create-room', (req, res) => {
  const { hostName, auctionSettings } = req.body;

  if (!hostName || !auctionSettings) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const roomId = genID().toUpperCase();
  const adminKey = crypto.randomBytes(8).toString('hex');

  const state = {
    roomId,
    host: hostName,
    settings: auctionSettings,
    status: 'waiting',
    currentBid: auctionSettings.defaultBid,
    players: [],
  };

  rooms.set(roomId, state);

  res.json({ roomId, adminKey });
});

/* ---------- SOCKET ---------- */

io.on('connection', (socket) => {
  socket.on('ACTION', ({ type, payload }) => {
    if (!type || !payload) return;

    if (type === 'JOIN_ROOM') {
      const { roomId, ...playerData } = payload;
      const room = rooms.get(roomId);
      if (!room) return;

      socket.join(roomId);
      socket.data.roomId = roomId;
      socket.data.player = playerData;

      const exists = room.players.find((p) => p.uid === playerData.uid);
      if (!exists) {
        room.players.push({
          ...playerData,
          status: 'joined',
        });
      }

      socket.emit('STATE', room);

      socket.to(roomId).emit('STATE', room);
      console.log('JOIN ROOM');
    }

    if (type === 'SEND_MESSAGE') {
      const { roomId, ...messageData } = payload;
      const room = rooms.get(roomId);
      if (!room) return;
      console.log({ messageData });
      io.to(roomId).emit('RECEIVE_MESSAGE', { messageData });
    }

    if (type === 'PLACE_BID') {
      const room = rooms.get(payload.roomId);
      if (!room) return;

      room.currentBid += room.settings.defaultBid;
      io.to(room.roomId).emit('STATE', room);
    }
  });

  socket.on('disconnect', () => {
    const { roomId, player } = socket.data;
    if (roomId && player) {
      const room = rooms.get(roomId);
      if (room) {
        room.players = room.players.filter((p) => p.uid !== player.uid);
        io.to(roomId).emit('STATE', room);
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
