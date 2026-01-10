const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const crypto = require('crypto');
const util = require('util');

const { baseTeams, extraTeams } = require('./data');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'https://vljb8mcl-3000.inc1.devtunnels.ms' },
});

app.use(cors());
app.use(express.json());

const rooms = new Map();
const roomLock = new Map();

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
    players: {},
    phase: 1,
    timer: {
      isActive: false,
      currentTime: 0,
    },
    teamAuction: {
      teams: {},
      currentTeamId: 'CSK',
      highestBid: 0,
      highestBidderId: '',
    },
  };

  rooms.set(roomId, state);
  roomLock.set(roomId, adminKey);

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

      if (!room.players[playerData.uid]) {
        room.players[playerData.uid] = {
          ...playerData,
          team: {
            name: '',
            price: '',
          },
          purchased: [],
          wallet: room.settings.totalPurse,
          isHost: false,
          status: 'joined',
        };
      }

      socket.emit('STATE', room);

      socket.to(roomId).emit('STATE', room);
      console.log(room);
    }

    if (type === 'CLAIM_ADMIN') {
      const { roomId, adminKey, playerId } = payload;

      const room = rooms.get(roomId);
      if (!room) return;

      if (roomLock.get(roomId) !== adminKey) return;

      const player = room.players[playerId];
      if (!player) return;

      room.adminPlayerId = playerId;
      room.status = 'admin_claimed';
      player.isHost = true;

      io.to(roomId).emit('STATE', room);
    }

    if (type === 'SEND_MESSAGE') {
      const { roomId, ...messageData } = payload;
      const room = rooms.get(roomId);
      if (!room) return;
      console.log({ messageData });
      io.to(roomId).emit('RECEIVE_MESSAGE', { messageData });
    }

    if (type === 'CHANGE_SETTINGS') {
      const { roomId, ...settings } = payload;
      const room = rooms.get(roomId);
      if (!room) return;
      console.log({ settings });
      room.settings = settings;
      Object.values(room.players).forEach((player) => {
        player.wallet = room.settings.totalPurse;
      });
      io.to(roomId).emit('UPDATE_SETTINGS', { settings });
    }

    if (type === 'START_AUCTION') {
      const { roomId, ...adminData } = payload;
      const room = rooms.get(roomId);
      if (!room) return;

      if (roomLock.get(roomId) !== adminData.adminKey) return;

      console.log('Room Unlocked');
      room.phase = 2;
      const mode = room.settings.teamsMode;
      const clone = (obj) => JSON.parse(JSON.stringify(obj));
      if (mode === '10') {
        room.teamAuction.teams = Object.fromEntries(Object.entries(clone(baseTeams)).slice(0, 10));
      } else if (mode === '14') {
        room.teamAuction.teams = {
          ...clone(baseTeams),
          ...clone(extraTeams),
        };
      }

      const teamIds = Object.keys(room.teamAuction.teams);
      let currentTeamIndex = 0;
      room.teamAuction.currentTeamId = teamIds[currentTeamIndex];
      room.teamAuction.highestBid = 0;
      room.teamAuction.highestBidderId = '';
      room.timer.currentTime = room.settings.timePerPlayer;
      room.timer.isActive = true;

      io.to(roomId).emit('STATE', room);

      console.log(util.inspect(rooms, { depth: null }));
      const auctionInterval = setInterval(() => {
        room.timer.currentTime -= 1;

        io.to(roomId).emit('STATE', room);

        if (room.timer.currentTime <= 0) {
          const currentTeamId = room.teamAuction.currentTeamId;
          const winningBidderId = room.teamAuction.highestBidderId;
          const winningBid = room.teamAuction.highestBid;

          if (winningBidderId && room.players[winningBidderId]) {
            const winner = room.players[winningBidderId];
            winner.wallet -= winningBid;

            room.teamAuction.teams[currentTeamId].soldTo = winner.uid;
            room.teamAuction.teams[currentTeamId].soldPrice = winningBid;
            room.players[winner.uid].team.name = room.teamAuction.teams[currentTeamId].name;
            room.players[winner.uid].team.price = room.teamAuction.teams[currentTeamId].soldPrice;
          }

          room.teamAuction.highestBid = 0;
          room.teamAuction.highestBidderId = '';

          currentTeamIndex += 1;
          if (currentTeamIndex < teamIds.length) {
            room.teamAuction.currentTeamId = teamIds[currentTeamIndex];
            room.timer.currentTime = room.settings.timePerPlayer;
          } else {
            clearInterval(auctionInterval);
            room.timer.isActive = false;
            console.log('Team auction ended');
          }
          io.to(roomId).emit('STATE', room);
        }
      }, 1000);
    }

    if (type === 'TEAM_BID_PLACED') {
      const { roomId, playerId, bid } = payload;
      const room = rooms.get(roomId);
      if (!room) return;

      const player = room.players[playerId];
      if (!player) return;

      if (room.players[playerId].team.name !== '') return;

      if (bid > player.wallet) return;

      if (bid > room.teamAuction.highestBid) {
        room.teamAuction.highestBid = bid;
        room.teamAuction.highestBidderId = playerId;
      }
      const messageData = {
        uid: player.uid,
        user: player.name,
        avatar: player.avatar,
        message: `${player.name} secretly placed bid on ${room.teamAuction.currentTeamId}`,
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true,
      };

      console.log({ messageData });

      io.to(roomId).emit('RECEIVE_MESSAGE', { messageData });
    }
  });

  socket.on('disconnect', () => {
    const { roomId, player } = socket.data;
    if (roomId && player) {
      const room = rooms.get(roomId);
      if (room) {
        delete room.players[player.uid];
        io.to(roomId).emit('STATE', room);
      }
    }
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
