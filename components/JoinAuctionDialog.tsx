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
import Image from 'next/image';

const avatars = [
  'wilson.png',
  'willow.png',
  'wolfgang.png',
  'wendy.png',
  'wx-78.png',
  'wickerbottom.png',
  'woodie.png',
  'wes.png',
  'maxwell.png',
  'wigfrid.png',
  'webber.png',
  'winona.png',
  'warly.png',
  'walter.png',
  'wortox.png',
  'wormwood.png',
  'wurt.png',
  'wanda.png',
  'wonkey.png',
];

interface JoinAuctionDialogProps {
  onJoin: (name: string, avatar: string) => void;
  triggerButton?: boolean;
}

function AvatarPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {avatars.map((a) => (
        <button
          key={a}
          onClick={() => onChange(a)}
          className={`relative h-14 w-14 rounded-md border flex items-center justify-center transition ${
            value === a ? 'border-primary' : 'hover:bg-muted'
          }`}
        >
          <Image src={`/avatars/${a}`} alt={a} width={48} height={48} className="rounded" />
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
  const [avatar, setAvatar] = useState(avatars[0]);

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
