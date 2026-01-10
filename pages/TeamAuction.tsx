'use client';

import { useEffect, useState } from 'react';

import { ChatBox } from '@/components/ChatBox';

import { BidPanel } from '@/components/BidPanel';
import { UserInfoCard } from '@/components/UserInfoCard';
import { TeamAuctionHeader } from '@/components/TeamAuctionHeader';
import { AuctionPhaseHeader } from '@/components/AuctionPhaseHeader';
import { TeamsTable } from '@/components/TeamsTable';

export default function TeamAuction({
  phase,
  playerID,
  userInfo,
  teams,
  currentTeam,
  messages,
  onSendMessage,
  onSendBid,
}: TeamAuctionProps) {
  return (
    <div className="flex h-full min-h-screen gap-4 p-20">
      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <TeamsTable teams={[]} />
      </div>

      <div className="flex flex-col flex-2 gap-4 min-h-0">
        <div className="flex w-full gap-4">
          <div className="w-1/3">
            <UserInfoCard
              name={userInfo.name}
              avatar={userInfo.avatar}
              wallet={userInfo.wallet}
              playerId={userInfo.playerId}
            />
          </div>

          <div className="flex-1">
            <AuctionPhaseHeader
              phaseName={'Team Auction'}
              currentPhase={phase}
              totalPhases={4}
              teamsRemaining={0}
            />
          </div>
        </div>

        <TeamAuctionHeader
          teamName={currentTeam.teamName}
          timeLeft={currentTeam.timeLeft}
          totalTime={currentTeam.totalTime}
          round={3}
        />
        <div className="flex w-full gap-4">
          <div className="flex-1">
            <BidPanel
              maxBid={120}
              onBidSubmit={onSendBid}
              onAuctionEnd={(winner, amount) => handleLog(`${winner} won the team for ₹${amount}L`)}
            />
          </div>
        </div>
        <div className="flex-1 min-h-0" />
      </div>

      <div className="flex flex-col flex-1 gap-4 min-h-0">
        <ChatBox messages={messages} onSend={onSendMessage} currentUserId={playerID} />
      </div>
    </div>
  );
}
