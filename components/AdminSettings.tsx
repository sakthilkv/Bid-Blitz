'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Settings, IndianRupee, Users, Clock, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

type TeamsMode = '10' | '14';

type AdminSettingsProps = {
  defaultBid: number;
  teamsMode: TeamsMode;
  totalPurse: number;
  timePerPlayer: number; // seconds per player
  onChange?: (settings: {
    defaultBid: number;
    teamsMode: TeamsMode;
    totalPurse: number;
    timePerPlayer: number;
  }) => void;
  onSave?: (settings: {
    defaultBid: number;
    teamsMode: TeamsMode;
    totalPurse: number;
    timePerPlayer: number;
  }) => void;
};

export function AdminSettings({
  defaultBid,
  teamsMode,
  totalPurse,
  timePerPlayer,
  onChange,
  onSave,
}: AdminSettingsProps) {
  const [bid, setBid] = React.useState(defaultBid);
  const [mode, setMode] = React.useState<TeamsMode>(teamsMode);
  const [purse, setPurse] = React.useState(totalPurse);
  const [time, setTime] = React.useState(timePerPlayer);

  React.useEffect(() => {
    setBid(defaultBid);
    setMode(teamsMode);
    setPurse(totalPurse);
    setTime(timePerPlayer);
  }, [defaultBid, teamsMode, totalPurse, timePerPlayer]);

  React.useEffect(() => {
    onChange?.({
      defaultBid: bid,
      teamsMode: mode,
      totalPurse: purse,
      timePerPlayer: time,
    });
  }, [bid, mode, purse, time]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <CardTitle>Admin Settings</CardTitle>
          <Badge variant="secondary">Host</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Default Bid + Total Purse + Time per Player */}
        <div className="flex flex-row justify-between gap-5">
          <div className="space-y-2 w-full">
            <Label className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Default Bid Amount
            </Label>
            <Input type="number" value={bid} onChange={(e) => setBid(Number(e.target.value))} />
          </div>

          <div className="space-y-2 w-full">
            <Label className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4" />
              Total Purse Per Team
            </Label>
            <Input type="number" value={purse} onChange={(e) => setPurse(Number(e.target.value))} />
          </div>

          <div className="space-y-2 w-full">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Bid Time (s)
            </Label>
            <Input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
          </div>
        </div>

        <Separator />

        {/* Teams Mode */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Teams Configuration
          </Label>

          <RadioGroup
            value={mode}
            onValueChange={(v) => setMode(v as TeamsMode)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="10" id="teams-10" />
              <Label htmlFor="teams-10">
                10 Teams <span className="text-xs text-muted-foreground">(Standard)</span>
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="14" id="teams-14" />
              <Label htmlFor="teams-14">
                14 Teams{' '}
                <span className="text-xs text-muted-foreground">
                  (Deccan Chargers, Kochi Tuskers, RPS, Gujarat Lions)
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() =>
              onSave?.({ defaultBid: bid, teamsMode: mode, totalPurse: purse, timePerPlayer: time })
            }
          >
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
