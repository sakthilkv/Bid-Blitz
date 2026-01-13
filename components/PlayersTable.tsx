import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, IndianRupee, Plane, Circle, Swords, Sword } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const RoleIcon = ({ role }: { role: PlayerRole }) => {
  if (role === 'batsman') return <Sword className="h-4 w-4" />;
  if (role === 'bowler') return <Circle className="h-4 w-4" />;
  return <Swords className="h-4 w-4" />;
};

export function PlayersTable({ players }: PlayersTableProps) {
  return (
    <ScrollArea className="rounded-lg border bg-card min-h-0">
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
                  <RoleIcon role={player.role} />
                  <div className="flex items-center gap-1 min-w-0">
                    <span className="truncate font-medium">{player.name}</span>
                    {player.overseas && <Plane className="h-3 w-3 text-muted-foreground" />}
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
                  <div className="flex items-center gap-1 truncate">
                    <IndianRupee className="h-4 w-4 shrink-0" />
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
