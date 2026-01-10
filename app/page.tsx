'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Gavel, User, Settings } from 'lucide-react';
import { AdminSettings } from '@/components/AdminSettings';
import { useRouter } from 'next/navigation';
import { URL } from '@/utils/Constants';

export default function Page() {
  const [name, setName] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const router = useRouter();

  const handleCreate = async () => {
    const res = await fetch(`${URL}/create-room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hostName: name,
        auctionSettings: settings,
      }),
    });

    const data = await res.json();

    localStorage.setItem(
      'auction_admin',
      JSON.stringify({
        roomId: data.roomId,
        adminKey: data.adminKey,
        name,
      }),
    );

    router.push(`/room/${data.roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-3xl">
            <Gavel className="h-7 w-7 text-amber-500" />
            Bid Blitz
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your name and configure auction settings
          </p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label>Your Name</Label>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Settings className="h-4 w-4" />
              Auction Settings
            </div>

            <AdminSettings
              defaultBid={20}
              teamsMode="10"
              totalPurse={12500}
              timePerPlayer={20}
              onSave={(s: any) => setSettings(s)}
            />
          </div>

          <Button
            size="lg"
            disabled={!name || !settings}
            className="w-full text-lg"
            onClick={handleCreate}
          >
            Create Room
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              localStorage.clear(); 
            }}
          >
            Clear Player Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
