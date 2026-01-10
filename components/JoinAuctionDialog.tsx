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

const animals = [
  '🐶',
  '🐱',
  '🦊',
  '🐻',
  '🐼',
  '🐯',
  '🦁',
  '🐸',
  '🐵',
  '🐨',
  '🐮',
  '🐷',
  '🐰',
  '🐹',
];

interface JoinAuctionDialogProps {
  onJoin: (name: string, avatar: string) => void;
  triggerButton?: boolean;
}

function AvatarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-7 gap-2">
      {animals.map((a) => (
        <button
          key={a}
          onClick={() => onChange(a)}
          className={`relative h-10 rounded-md border text-2xl flex items-center justify-center transition ${
            value === a ? ' text-primary-foreground border-primary' : 'hover:bg-muted'
          }`}
        >
          {a}
          {value === a && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500" />
          )}
        </button>
      ))}
    </div>
  );
}

export default function JoinAuctionDialog({
  onJoin,
  triggerButton = true,
}: JoinAuctionDialogProps) {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(animals[0]);

  const handleJoin = () => {
    if (!name.trim()) return;
    onJoin(name.trim(), avatar);
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
          <DialogDescription>Choose a name and avatar to join the auction.</DialogDescription>
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

          <AvatarPicker value={avatar} onChange={setAvatar} />
        </div>

        <DialogFooter>
          <Button onClick={handleJoin}>Enter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
