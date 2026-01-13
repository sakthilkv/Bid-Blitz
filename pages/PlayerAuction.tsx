'use client';

import { useEffect, useState } from 'react';

import { ChatBox } from '@/components/ChatBox';

import { BidPanel } from '@/components/BidPanel';
import { UserInfoCard } from '@/components/UserInfoCard';
import { TeamAuctionHeader } from '@/components/TeamAuctionHeader';
import { AuctionPhaseHeader } from '@/components/AuctionPhaseHeader';
import { TeamsTable } from '@/components/TeamsTable';
import { PlayerAuctionHeader } from '@/components/PlayerAuctionHeader';
import { PlayersTable } from '@/components/PlayersTable';

export default function PlayerAuction() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        user: 'System',
        message: 'Auction started for Team RCB',
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true,
      },
    ]);
  }, []);

  const handleLog = (text: string) => {
    setMessages((m) => [
      ...m,
      {
        id: crypto.randomUUID(),
        user: 'System',
        message: text,
        timestamp: new Date().toLocaleTimeString(),
        isSystem: true,
      },
    ]);
  };

  return (
    <div className="flex h-full min-h-screen gap-4 p-20">
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <PlayersTable
          players={[
            {
              id: 'VK',
              name: 'Virat Kohli',
              role: 'batsman',
              overseas: false,
              status: 'sold',
              price: 1500,
              team: 'RCB',
            },
            {
              id: 'RT',
              name: 'Trent Boult',
              role: 'bowler',
              overseas: true,
              status: 'unsold',
            },
          ]}
        />
      </div>

      <div className="flex flex-col flex-2 gap-4 min-h-0">
        <div className="flex w-full gap-4">
          <div className="w-1/3">
            <UserInfoCard name="Sakthi" pfp="/avatar.png" wallet={100} />
          </div>

          <div className="flex-1">
            <AuctionPhaseHeader
              phaseName={'Player Auction'}
              currentPhase={2}
              totalPhases={2}
              teamsRemaining={0}
            />
          </div>
        </div>
        <PlayerAuctionHeader
          playerName="Virat Kohli"
          basePrice={20}
          bidIncrement={5}
          timeLeft={60}
          status="bidding"
        />

        <div className="flex-1 min-h-0" />
      </div>

      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <ChatBox
          messages={messages}
          onSend={(msg) =>
            setMessages((m) => [
              ...m,
              {
                id: crypto.randomUUID(),
                user: 'You',
                message: msg,
                timestamp: new Date().toLocaleTimeString(),
              },
            ])
          }
        />
      </div>
    </div>
  );
}
