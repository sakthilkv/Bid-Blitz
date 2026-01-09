const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const rooms = new Map();

/* ---------- helpers ---------- */

const createRoom = ({ host, settings }) => {
  const roomId = Math.random().toString(36).slice(2, 8);
  const state = {
    roomId,
    host,
    settings,
    currentBid: settings.defaultBid,
    status: 'waiting',
  };
  rooms.set(roomId, state);
  return state;
};

const placeBid = ({ roomId }) => {
  const room = rooms.get(roomId);
  if (!room) return null;
  room.currentBid += room.settings.defaultBid;
  room.status = 'bidding';
  return room;
};

/* ---------- action router ---------- */

const ACTIONS = {
  CREATE_ROOM: (payload, socket) => {
    const state = createRoom(payload);
    socket.join(state.roomId);
    return state;
  },

  PLACE_BID: (payload) => {
    return placeBid(payload);
  },
};

/* ---------- socket ---------- */

io.on('connection', (socket) => {
  socket.on('ACTION', ({ type, payload }) => {
    const handler = ACTIONS[type];
    if (!handler) return;

    const updatedState = handler(payload, socket);
    if (!updatedState) return;

    io.to(updatedState.roomId).emit('STATE', updatedState);
  });
});

httpServer.listen(3001, () => {
  console.log('Socket server running on 3001');
});
