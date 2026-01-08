import { Volume2, VolumeX, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuctionControlBar from './AuctionController';

type StatusBarProps = {
	roomId: string;
	playersInRoom: number;
	totalPlayers: number;
	muted: boolean;
	onToggleMute: () => void;
	signalStrength: 'good' | 'bad';
};

export default function StatusBar({
	roomId,
	playersInRoom,
	totalPlayers,
	muted,
	onToggleMute,
	signalStrength,
}: StatusBarProps) {
	return (
		<div className="flex items-center justify-around  px-4 py-2 border-b bg-muted">
			<div className="flex items-center gap-4 text-sm">
				<span className="font-mono">
					Room: <span className="font-semibold">{roomId}</span>
				</span>
				<span>
					{playersInRoom}/{totalPlayers} Players
				</span>
			</div>

			<div className="flex items-center gap-2">
				<AuctionControlBar
					onStart={() => console.log('Auction Started')}
					onStop={() => console.log('Auction Stopped')}
					onResume={() => console.log('Auction Resumed')}
				/>
				<Button variant="ghost" size="icon" onClick={onToggleMute} aria-label="Toggle mute">
					{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
				</Button>

				{signalStrength === 'good' ? (
					<Wifi size={18} className="text-green-500" />
				) : (
					<WifiOff size={18} className="text-red-500" />
				)}
			</div>
		</div>
	);
}
