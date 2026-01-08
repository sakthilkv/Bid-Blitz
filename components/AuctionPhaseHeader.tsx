import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Props = {
  phaseName: string;
  currentPhase: number;
  totalPhases: number;
  teamsRemaining: number;
};

export function AuctionPhaseHeader({
  phaseName,
  currentPhase,
  totalPhases,
  teamsRemaining,
}: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between py-4">
        <div>
          <div className="text-sm text-muted-foreground">Phase</div>
          <div className="text-lg font-semibold">{phaseName}</div>
        </div>

        <div className="flex gap-4">
          <Badge variant="outline">
            Phase {currentPhase} / {totalPhases}
          </Badge>
          <Badge variant="secondary">{teamsRemaining} Teams Left</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
