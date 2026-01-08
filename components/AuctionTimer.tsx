'use client';

import { Progress } from '@/components/ui/progress';
import { Timer } from 'lucide-react';

type Props = {
  remaining: number;
  total: number;
};

export function AuctionTimer({ remaining, total }: Props) {
  const percent = (remaining / total) * 100;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1">
          <Timer className="h-4 w-4" />
          Time Left
        </div>
        <span>{remaining}s</span>
      </div>
      <Progress value={percent} />
    </div>
  );
}
