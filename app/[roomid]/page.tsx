'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';
import JoiningPhase from '@/pages/JoiningPhase';

// mock socket for now
const socket = {
	connected: true,
};

const room = {
	id: 'A9F3K',
	phase: 'PLAYER_AUCTION',

	players: {
		u1: { id: 'u1', name: 'Sakthi', connected: true },
		u2: { id: 'u2', name: 'Rahul', connected: true },
		u3: { id: 'u3', name: 'Arjun', connected: false },
	},

	maxPlayers: 8,

	game: {
		currentPlayer: 'Virat Kohli',
		currentBid: 320,
		highestBidder: 'u2',
	},
};

export default function Page() {
	const [muted, setMuted] = useState(false);

	const playersInRoom = Object.values(room.players).filter((p) => p.connected).length;

	return (
		<div>
			<div className="bg-background h-screen">
				<span>
					<JoiningPhase />
				</span>
			</div>
		</div>
	);
}
