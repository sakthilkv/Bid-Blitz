import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ChatBox({ messages, onSend, currentUserId }: ChatBoxProps) {
  const [text, setText] = React.useState('');
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col h-full min-h-0">
      <CardHeader className="pb-2">
        <CardTitle>Lobby Chat</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="flex-1 min-h-0 flex flex-col gap-3 pt-3">
        <ScrollArea className="flex-1 min-h-0 pr-3">
          <div className="space-y-3 mt-3">
            {messages.map((m, index) => {
              const isMe = m.uid === currentUserId;

              if (m.isSystem) {
                return (
                  <div
                    key={`${m.uid}-${index}`}
                    className="text-center text-xs text-muted-foreground"
                  >
                    <span className="border p-2 rounded-lg text-primary font-bold">
                      {m.message}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={`${m.uid}-${index}`}
                  className={cn('flex gap-2', isMe ? 'justify-end' : 'justify-start')}
                >
                  {!isMe && (
                    <Avatar className="h-10 w-10 bg-muted pb-1">
                      <AvatarImage src={`/avatars/${m.avatar}`} className="object-contain" />
                      <AvatarFallback className="text-xl">
                        {m.avatar?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={cn(
                      'max-w-xs rounded-lg px-3 py-2 text-sm',
                      isMe ? 'bg-primary text-primary-foreground' : 'bg-muted',
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-xs">{isMe ? 'You' : m.user}</span>
                      {m.timestamp && <span className="text-[10px] opacity-70">{m.timestamp}</span>}
                    </div>
                    <div>{m.message}</div>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && text.trim()) {
                onSend?.(text);
                setText('');
              }
            }}
          />
          <Button
            onClick={() => {
              if (!text.trim()) return;
              onSend?.(text);
              setText('');
            }}
          >
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
