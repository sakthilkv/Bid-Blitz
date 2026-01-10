'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import JoiningPhase from '@/pages/JoiningPhase';
import JoinAuctionDialog from '@/components/JoinAuctionDialog';
import { generateUUID } from '@/utils/Utils';
import { URL } from '@/utils/Constants';

export default function RoomPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [settings, setSettings] = useState({
    defaultBid: 20,
    teamsMode: '10',
    totalPurse: 100,
    timePerPlayer: 0,
  });

  const [roomUrl, setRoomUrl] = useState('');
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split('/').pop() || '';
    setRoomId(id);
    setRoomUrl(window.location.href);
  }, []);

  useEffect(() => {
    const socket = io(URL);
    socketRef.current = socket;

    socket.on('STATE', (state) => {
      if (state.players) setParticipants(state.players);
      if (state.settings) setSettings(state.settings);
    });

    socket.on('RECEIVE_MESSAGE', (message) => {
      setMessages((prev) => [...prev, message.messageData]);
    });

    socket.on('UPDATE_SETTINGS', (payload) => {
      setSettings(payload.settings);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('PlayerData');
    if (stored) {
      const player = JSON.parse(stored);
      setUserName(player.name);
      setPlayerId(player.uid);
    }
  }, []);

  useEffect(() => {
    if (!socketRef.current || !userName || !playerId || !roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'JOIN_ROOM',
      payload: { roomId, name: userName, uid: playerId },
    });

    const raw = localStorage.getItem('auction_admin');
    if (!raw) return;

    const adminData = JSON.parse(raw);
    if (adminData.roomId !== roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'CLAIM_ADMIN',
      payload: {
        roomId,
        adminKey: adminData.adminKey,
        playerId,
      },
    });
  }, [userName, playerId, roomId]);

  const handleJoin = (name: string) => {
    const uid = generateUUID();
    const playerData = { name, uid };
    localStorage.setItem('PlayerData', JSON.stringify(playerData));

    setUserName(name);
    setPlayerId(uid);
  };

  const handleSendMessage = (text: string) => {
    if (!playerId || !socketRef.current || !roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'SEND_MESSAGE',
      payload: {
        roomId,
        message: text,
        user: userName,
        uid: playerId,
        timestamp: new Date().toLocaleTimeString(),
      },
    });
  };

  function startAuction() {
    if (!socketRef.current || !roomId) return;

    const raw = localStorage.getItem('auction_admin');
    if (!raw) return;

    const payload = JSON.parse(raw);
    if (!payload || payload.roomId !== roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'START_AUCTION',
      payload,
    });
  }

  if (!userName) {
    return <JoinAuctionDialog onJoin={handleJoin} triggerButton={false} />;
  }

  return (
    <JoiningPhase
      roomUrl={roomUrl}
      playerID={playerId!}
      messages={messages}
      participants={participants}
      settings={settings}
      onSendMessage={handleSendMessage}
      onSettingsChange={(newSettings) => {
        setSettings(newSettings);
        if (socketRef.current && roomId) {
          socketRef.current.emit('ACTION', {
            type: 'CHANGE_SETTINGS',
            payload: { roomId, ...newSettings },
          });
        }
      }}
      onStart={startAuction}
    />
  );
}
