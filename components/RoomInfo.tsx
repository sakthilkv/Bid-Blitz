import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CopyButton } from './ui/copy-button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

type RoomInfoProps = {
	roomUrl: string;
};

function extractRoomId(url: string) {
	const parts = url.split('/');
	return parts[parts.length - 1];
}

export function RoomInfo({ roomUrl }: RoomInfoProps) {
	const roomId = extractRoomId(roomUrl);

	return (
		<Card>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle>Room Info</CardTitle>
					<Badge variant="outline">LAN</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-3">
				<div className="space-y-1">
					<span className="text-xs text-muted-foreground">Room URL</span>
					<div className="flex gap-2">
						<Input value={roomUrl} readOnly />
						<CopyButton value={roomUrl} />
					</div>
				</div>

				<div className="space-y-1">
					<span className="text-xs text-muted-foreground">Room ID</span>
					<div className="flex gap-2">
						<Input value={roomId} readOnly className="max-w-[140px]" />
						<CopyButton value={roomId} />
					</div>
				</div>

				<div className="text-xs text-muted-foreground">
					Share this link with teams on the same network
				</div>
			</CardContent>
		</Card>
	);
}
