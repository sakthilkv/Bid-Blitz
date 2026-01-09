'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface JoinAuctionDialogProps {
  onJoin: (name: string) => void;
  triggerButton?: boolean;
}

export default function JoinAuctionDialog({
  onJoin,
  triggerButton = true,
}: JoinAuctionDialogProps) {
  const [name, setName] = useState('');

  const handleJoin = () => {
    if (!name.trim()) return;
    onJoin(name.trim());
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      {triggerButton && (
        <DialogTrigger>
          <Button variant="outline">
            <User className="w-4 h-4 mr-2" />
            Join Auction
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Enter Your Name</DialogTitle>
          <DialogDescription>
            Join the auction room by entering your display name.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
              autoFocus
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleJoin}>Enter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
