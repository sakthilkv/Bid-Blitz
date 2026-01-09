'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Timer, User, Gavel, Plus } from 'lucide-react';

type Props = {
  playerName: string;
  basePrice: number;
  bidIncrement: number;
  timeLeft: number;
  totalTime?: number;
  status?: 'bidding' | 'ended';
};

export function PlayerAuctionHeader({
  playerName,
  basePrice,
  bidIncrement,
  timeLeft,
  totalTime = timeLeft,
  status = 'bidding',
}: Props) {
  const [remaining, setRemaining] = useState(timeLeft);
  const [currentBid, setCurrentBid] = useState(basePrice);

  useEffect(() => {
    if (remaining <= 0) return;
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [remaining]);

  const progress = (remaining / totalTime) * 100;

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-2xl font-bold text-emerald-500">{playerName}</span>
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

        <Progress className="h-3" value={progress} />
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Current Bid</div>
          <div className="flex items-center gap-1 text-xl font-bold">
            <Gavel className="h-4 w-4" />₹{currentBid}L
          </div>
        </div>

        <Button
          disabled={status === 'ended' || remaining <= 0}
          className="flex items-center gap-2 text-lg"
          onClick={() => setCurrentBid((b) => b + bidIncrement)}
        >
          <Plus className="h-5 w-5" />
          Bid {bidIncrement}L
        </Button>
      </CardContent>
    </Card>
  );
}
