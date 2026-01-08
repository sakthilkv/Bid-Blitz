'use client';

import { useEffect, useState } from 'react';

import { ChatBox } from '@/components/ChatBox';

import { BidPanel } from '@/components/BidPanel';
import { UserInfoCard } from '@/components/UserInfoCard';
import { TeamAuctionHeader } from '@/components/TeamAuctionHeader';
import { AuctionPhaseHeader } from '@/components/AuctionPhaseHeader';
import { TeamsTable } from '@/components/TeamsTable';

export default function TeamAuction() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        id: '1',
        user: 'System',
        message: 'Auction started for Team RCB',
        timestamp: new Date().toLocaleTimeString(),
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
      },
    ]);
  };

  return (
    <div className="flex h-full min-h-screen gap-4 p-20">
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <TeamsTable
          teams={[
            {
              id: 'rcb',
              name: 'Royal Challengers Bangalore',
              status: 'sold',
              price: 120,
              boughtBy: 'Team CSK',
            },
            { id: 'mi', name: 'Mumbai Indians', status: 'available' },
            {
              id: 'csk',
              name: 'Chennai Super Kings',
              status: 'sold',
              price: 130,
              boughtBy: 'Team DC',
            },
            { id: 'dc', name: 'Delhi Capitals', status: 'available' },
            {
              id: 'kkr',
              name: 'Kolkata Knight Riders',
              status: 'sold',
              price: 110,
              boughtBy: 'Team SRH',
            },
            { id: 'srh', name: 'Sunrisers Hyderabad', status: 'available' },
            {
              id: 'rr',
              name: 'Rajasthan Royals',
              status: 'sold',
              price: 115,
              boughtBy: 'Team RCB',
            },
            { id: 'pk', name: 'Punjab Kings', status: 'available' },
            { id: 'gt', name: 'Gujarat Titans', status: 'sold', price: 125, boughtBy: 'Team MI' },
            { id: 'lsg', name: 'Lucknow Super Giants', status: 'available' },
            { id: 'kca', name: 'Kerala Kings Alliance', status: 'available' },
            { id: 'mfa', name: 'Mumbai Fire Angels', status: 'available' },
            { id: 'hyd', name: 'Hyderabad Hawks', status: 'available' },
            { id: 'ban', name: 'Bangalore Blasters', status: 'available' },
          ]}
        />
      </div>

      <div className="flex flex-col flex-2 gap-4 min-h-0">
        <AuctionPhaseHeader
          phaseName={'Team Auction'}
          currentPhase={0}
          totalPhases={0}
          teamsRemaining={0}
        />
        <TeamAuctionHeader
          teamName="Royal Challengers Bangalore"
          timeLeft={15}
          totalTime={20}
          round={3}
        />
        <div className="flex w-full gap-4">
          <div className="w-1/3">
            <UserInfoCard name="Sakthi" pfp="/avatar.png" wallet={100} />
          </div>

          <div className="flex-1">
            <BidPanel
              maxBid={120}
              onBidSubmit={() => handleLog('A bid was placed secretly')}
              onAuctionEnd={(winner, amount) => handleLog(`${winner} won the team for ₹${amount}L`)}
            />
          </div>
        </div>
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
