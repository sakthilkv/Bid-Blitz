import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Participant = {
	id: string;
	name: string;
	status: 'joined' | 'ready';
	isHost?: boolean;
};

type ParticipantsListProps = {
	participants: Participant[];
};

export function ParticipantsList({ participants }: ParticipantsListProps) {
	return (
		<Card className="flex flex-col h-full">
			<CardHeader>
				<CardTitle>Participants</CardTitle>
			</CardHeader>

			<CardContent className="flex-1 min-h-0">
				<ScrollArea className="h-full">
					<div className="space-y-3">
						{participants.map((p) => (
							<div key={p.id} className="flex items-center justify-between rounded-lg border p-3">
								<div className="flex items-center gap-3">
									<Avatar>
										<AvatarFallback>{'A'}</AvatarFallback>
									</Avatar>

									<div className="flex flex-col">
										<span className="font-medium">{p.name}</span>
										<span className="text-xs text-muted-foreground">
											{p.status === 'ready' ? 'Ready' : 'Joined'}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2">
									{p.isHost && <Badge variant="secondary">Host</Badge>}
									<Badge variant={p.status === 'ready' ? 'default' : 'outline'}>{p.status}</Badge>
								</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
