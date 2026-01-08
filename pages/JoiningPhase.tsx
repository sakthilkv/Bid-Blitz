'use client';

import React, { useState } from 'react';
import { ChatBox } from '@/components/ChatBox';
import { ParticipantsList } from '@/components/ParticipantsList';
import { RoomInfo } from '@/components/RoomInfo';
import { AdminSettings } from '@/components/AdminSettings';

type Participant = {
  id: string;
  name: string;
  status: 'joined' | 'ready';
  isHost?: boolean;
};

export default function JoiningPhase() {
  const roomUrl = 'http://192.168.0.10:3000/room/ABC123';

  const [messages, setMessages] = useState([
    {
      id: '1',
      user: 'Team A',
      message: 'Ready?',
      timestamp: '10:01 PM',
    },
    {
      id: '2',
      user: 'Team B',
      message: 'Yes',
      timestamp: '10:02 PM',
    },
    {
      id: '3',
      user: 'Team B',
      message: 'Team MI left the room',
      timestamp: '10:02 PM',
      isSystem: true,
    },
  ]);

  const participants: Participant[] = [
    { id: '1', name: 'Team CSK', status: 'ready', isHost: true },
    { id: '2', name: 'Team MI', status: 'joined' },
    { id: '3', name: 'Team RCB', status: 'ready' },
  ];

  function handleSend(text: string) {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        user: 'You',
        message: text,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }

  return (
    <div className="flex h-full min-h-screen gap-4 p-20">
      <div className="flex flex-col flex-[2] gap-4 min-h-0">
        <div className="flex gap-4 w-full">
          <div className="flex-1">
            <RoomInfo roomUrl={roomUrl} />
          </div>

          <div className="flex-2">
            <AdminSettings
              defaultBid={20}
              teamsMode="10"
              totalPurse={100}
              onSave={(settings) => console.log('Saved settings:', settings)}
              timePerPlayer={0}
            />
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <ChatBox messages={messages} onSend={handleSend} />
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0">
        <ParticipantsList participants={participants} />
      </div>
    </div>
  );
}
