import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { IndianRupee } from 'lucide-react';

type Props = {
  name: string;
  pfp: string;
  wallet: number;
};

export function UserInfoCard({ name, pfp, wallet }: Props) {
  return (
    <Card className='h-full'>
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar>
          <AvatarImage src={pfp} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <Badge variant="outline">Wallet</Badge>
        <div className="flex items-center gap-1">
          <IndianRupee className="h-4 w-4" />
          {wallet}L
        </div>
      </CardContent>
    </Card>
  );
}
