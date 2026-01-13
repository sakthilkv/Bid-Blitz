'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import JoiningPhase from '@/pages/JoiningPhase';
import JoinAuctionDialog from '@/components/JoinAuctionDialog';
import { generateUUID } from '@/utils/Utils';
import { URL } from '@/utils/Constants';
import TeamAuction from '@/pages/TeamAuction';
import PlayerAuction from '@/pages/PlayerAuction';

export default function RoomPage() {
  const [player, setPlayer] = useState<{
    name: string;
    uid: string;
    avatar: string;
  } | null>(null);
  const [roomState, setRoomState] = useState<RoomStateProps | null>(null);

  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [settings, setSettings] = useState({
    defaultBid: 20,
    teamsMode: '10',
    totalPurse: 100,
    timePerPlayer: 0,
  });
  const [phase, setPhase] = useState<number>(1);
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
      if (state) setRoomState(state);
      console.log(state);
      if (state.players) {
        const participants: Participant[] = Object.values(state.players);
        setParticipants(participants);
      }
      if (state.settings) setSettings(state.settings);
      if (state.phase) setPhase(state.phase);
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
    if (stored) setPlayer(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!socketRef.current || !player || !roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'JOIN_ROOM',
      payload: {
        roomId,
        name: player.name,
        uid: player.uid,
        avatar: player.avatar,
      },
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
        playerId: player.uid,
        avatar: player.avatar,
      },
    });
  }, [player, roomId]);

  const handleJoin = (name: string, avatar: string) => {
    const uid = generateUUID();
    const data = { name, uid, avatar };
    localStorage.setItem('PlayerData', JSON.stringify(data));
    setPlayer(data);
  };

  const handleSendMessage = (text: string) => {
    if (!player || !socketRef.current || !roomId) return;

    socketRef.current.emit('ACTION', {
      type: 'SEND_MESSAGE',
      payload: {
        roomId,
        message: text,
        user: player.name,
        uid: player.uid,
        avatar: player.avatar,
        timestamp: new Date().toLocaleTimeString(),
      },
    });
  };
  function handleTeamBid(bid: number) {
    if (!socketRef.current || !roomId || !player) return;

    socketRef.current.emit('ACTION', {
      type: 'TEAM_BID_PLACED',
      payload: {
        roomId,
        playerId: player.uid,
        bid,
      },
    });
  }

  function getTeamsArray(
    teamObj: Record<
      string,
      {
        name: string;
        basePrice: number;
        soldTo: string | null;
        soldPrice: number | null;
      }
    >,
  ): Teams[] {
    return Object.entries(teamObj).map(([id, team]) => ({
      id,
      name: team.name,
      status: team.soldTo ? 'sold' : 'available',
      price: team.soldPrice ?? team.basePrice,
      owner: team.soldTo ? roomState?.players[team.soldTo]?.name : undefined,
      avatar: team.soldTo ? roomState?.players[team.soldTo]?.avatar : undefined,
    }));
  }

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

  if (!player) {
    return <JoinAuctionDialog onJoin={handleJoin} triggerButton={false} />;
  }

  if (phase === 1) {
    return (
      <JoiningPhase
        roomUrl={roomUrl}
        playerID={player.uid}
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

  if (phase === 2 && roomState && player) {
    const serverPlayer = roomState.players[player.uid];
    if (!serverPlayer) return null;
    const teamsArray = getTeamsArray(roomState.teamAuction.teams);
    console.log(roomState.teamAuction.teams[roomState.teamAuction.currentTeamId].name);
    return (
      <TeamAuction
        phase={roomState.phase}
        playerID={player.uid}
        userInfo={{
          playerId: serverPlayer.uid,
          name: serverPlayer.name,
          avatar: serverPlayer.avatar,
          wallet: serverPlayer.wallet ?? 0,
        }}
        onSendMessage={handleSendMessage}
        messages={messages}
        currentTeam={{
          teamName: roomState.teamAuction.teams[roomState.teamAuction.currentTeamId].name,
          timeLeft: roomState.timer.currentTime,
          totalTime: roomState.settings.timePerPlayer,
          status: 'bidding',
          round: undefined,
        }}
        onSendBid={handleTeamBid}
        teams={teamsArray}
      />
    );
  }

  if (phase === 3 && roomState && player) {
    <PlayerAuction/>

  }

  return null;
}
