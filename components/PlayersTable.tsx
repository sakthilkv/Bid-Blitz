import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, IndianRupee, User } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

type PlayerStatus = 'sold' | 'unsold';

type Player = {
  id: string;
  name: string;
  role?: string;
  status: PlayerStatus;
  price?: number;
  team?: string;
};

type Props = {
  players: Player[];
};

export function PlayersTable({ players }: Props) {
  return (
    <ScrollArea className="rounded-lg border bg-card  min-h-0">
      <Table className="table-fixed">
        <TableHeader className="sticky top-0 bg-muted z-10">
          <TableRow>
            <TableHead className="w-[35%]">Player</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
            <TableHead className="w-[20%]">Amount</TableHead>
            <TableHead className="w-[25%]">Team</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <div className="flex items-center gap-2 min-w-0">
                  <User className="h-4 w-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="truncate font-medium">{player.name}</div>
                    {player.role && (
                      <div className="text-xs text-muted-foreground">{player.role}</div>
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                {player.status === 'sold' ? (
                  <Badge className="flex w-fit items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Sold
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex w-fit items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    Unsold
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                {player.status === 'sold' ? (
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-4 w-4" />
                    <span>{player.price}L</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground ml-4">—</span>
                )}
              </TableCell>

              <TableCell>
                {player.status === 'sold' ? (
                  <span className="truncate">{player.team}</span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
