'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Timer, Gavel } from 'lucide-react';

export function TeamAuctionHeader({
  teamName,
  timeLeft,
  totalTime = timeLeft,
  status = 'bidding',
  round,
}: TeamAuctionHeaderProps) {
  const remaining = timeLeft;

  const progress = ( remaining  / totalTime) * 100;

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Gavel className="h-5 w-5" />
            <span className="text-2xl text-amber-500">{teamName}</span>
          </CardTitle>

          <div
            className={`flex items-center gap-2 px-3 py-1 text-xl font-semibold ${
              remaining <= 10 ? 'text-destructive' : 'text-foreground'
            }`}
          >
            <Timer size={24} />
            {remaining}s
          </div>
        </div>

        <Progress value={progress} />
      </CardHeader>

      <CardContent className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Status:{' '}
          <span className="font-medium text-foreground">
            {status === 'bidding' ? 'Secret Bidding Live' : 'Auction Ended'}
          </span>
        </span>

        {round && <span>Team Slot #{round}</span>}
      </CardContent>
    </Card>
  );
}
