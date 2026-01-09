'use client';

import { ChatBox } from '@/components/ChatBox';
import { ParticipantsList } from '@/components/ParticipantsList';
import { RoomInfo } from '@/components/RoomInfo';
import { AdminSettings } from '@/components/AdminSettings';

export default function JoiningPhase({
  roomUrl,
  playerID,
  messages,
  participants,
  settings,
  onSendMessage,
  onSettingsChange,
}: JoiningPhaseProps) {
  return (
    <div className="flex h-screen gap-4 p-16">
      <div className="flex flex-col flex-[2] gap-4 min-h-0">
        <div className="flex gap-4 flex-shrink-0">
          <div className="flex-1">
            <RoomInfo roomUrl={roomUrl} />
          </div>

          <div className="flex-[2]">
            <AdminSettings
              defaultBid={settings.defaultBid}
              teamsMode={settings.teamsMode}
              totalPurse={settings.totalPurse}
              timePerPlayer={settings.timePerPlayer}
              onSave={onSettingsChange}
            />
          </div>
        </div>

        <div className="flex-1 min-h-0">
          <ChatBox messages={messages} onSend={onSendMessage} currentUserId={playerID} />
        </div>
      </div>

      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <ParticipantsList participants={participants} />
      </div>
    </div>
  );
}
