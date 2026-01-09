'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IndianRupee, Lock } from 'lucide-react';

type Props = {
  maxBid: number;
  onBidSubmit: (amount: number) => void;
  onAuctionEnd: (winner: string, amount: number) => void;
};

export function BidPanel({ maxBid, onBidSubmit, onAuctionEnd }: Props) {
  const [bid, setBid] = useState<number | ''>('');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <Lock className="h-5 w-5" />
        <CardTitle>Secret Bid</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4" />
          <Input
            type="number"
            placeholder={`Max ₹${maxBid}L`}
            value={bid}
            onChange={(e) => setBid(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-between">
          <Button
            variant={'destructive'}
            onClick={() => onAuctionEnd('Team CSK', Number(bid || 0))}
          >
            End Auction
          </Button>
          <Button onClick={() => bid && onBidSubmit(bid)}>Submit Bid</Button>
        </div>
      </CardContent>
    </Card>
  );
}
