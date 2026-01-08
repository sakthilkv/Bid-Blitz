'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RefreshCw, StopCircle } from 'lucide-react';

type AuctionControlBarProps = {
	onStart?: () => void;
	onResume?: () => void;
	onStop?: () => void;
};

export default function AuctionControlBar({ onStart, onResume, onStop }: AuctionControlBarProps) {
	const [auctionState, setAuctionState] = useState<'NOT_STARTED' | 'RUNNING' | 'PAUSED'>(
		'NOT_STARTED',
	);

	const handleStart = () => {
		setAuctionState('RUNNING');
		onStart?.();
	};

	const handleResume = () => {
		setAuctionState('RUNNING');
		onResume?.();
	};

	const handleStop = () => {
		setAuctionState('PAUSED');
		onStop?.();
	};

	return (
		<div className="flex items-center justify-center gap-4">
			{auctionState === 'NOT_STARTED' && (
				<Button onClick={handleStart} variant="outline">
					<Play className="mr-2 h-4 w-4" /> Start
				</Button>
			)}

			{auctionState === 'RUNNING' && (
				<Button onClick={handleStop} variant="destructive">
					<StopCircle className="mr-2 h-4 w-4" /> Stop
				</Button>
			)}

			{auctionState === 'PAUSED' && (
				<Button onClick={handleResume} variant="default">
					<RefreshCw className="mr-2 h-4 w-4" /> Resume
				</Button>
			)}
		</div>
	);
}
