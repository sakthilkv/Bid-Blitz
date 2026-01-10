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

export function TeamsTable({ teams }: TeamsTableProps) {
  return (
    <div className="rounded-lg border bg-card">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[35%]">Team</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
            <TableHead className="w-[20%]">Price</TableHead>
            <TableHead className="w-[25%]">Owner</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>
                <div className="flex items-center gap-2 min-w-0">
                  {team.logo && (
                    <img src={team.logo} alt={team.name} className="h-6 w-6 rounded shrink-0" />
                  )}
                  <span className="truncate font-medium">{team.name}</span>
                </div>
              </TableCell>

              <TableCell>
                {team.status === 'sold' ? (
                  <Badge className="flex w-fit items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    Sold
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex w-fit items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    Available
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                {team.status === 'sold' ? (
                  <div className="flex items-center gap-1 truncate">
                    <IndianRupee className="h-4 w-4 shrink-0" />
                    <span>{team.price}L</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-muted-foreground ml-4">
                    {' '}
                    <span>—</span>
                  </div>
                )}
              </TableCell>

              <TableCell>
                {team.status === 'sold' ? (
                  <div className="flex items-center gap-2 min-w-0">
                    
                    <span className="truncate">{team.avatar}{" "}{team.owner}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {' '}
                    <span>—</span>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
