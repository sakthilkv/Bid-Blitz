type PlayerStatus = 'joined' | 'ready';

type Participant = {
  name: string;
  uid: string;
  avatar: string;
  team: {
    name: string;
    price: number;
  };
  purchased: {
    name: string;
    price: number;
  }[];
  wallet: number;
  isHost: boolean;
  status: PlayerStatus;
};

type ParticipantsListProps = {
  participants: Participant[];
};

type ChatMessage = {
  uid: string;
  user: string;
  avatar: string;
  message: string;
  timestamp?: string;
  isSystem?: boolean;
};

type ChatBoxProps = {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  currentUserId: string;
};

type JoiningPhaseProps = {
  roomUrl: string;
  playerID: string;
  messages: ChatMessage[];
  participants: Participant[];
  settings: any;
  onSendMessage: (text: string) => void;
  onSettingsChange: (settings: any) => void;
  onStart: () => void;
};

type UserInfoCardProps = {
  playerId: string;
  name: string;
  avatar: string;
  wallet: number;
};

type TeamStatus = 'available' | 'sold';

type Team = {
  id: string;
  name: string;
  logo?: string;
  status: TeamStatus;
  price?: number;
  boughtBy?: string;
  avatar?: string;
};

type TeamsTableProps = {
  teams: Team[];
};

type TeamAuctionHeaderProps = {
  teamName: string;
  timeLeft: number;
  totalTime?: number;
  status?: 'bidding' | 'ended';
  round?: number;
};

type TeamAuctionProps = {
  phase: number;
  playerID: string;
  userInfo: UserInfoCardProps;
  teams: Team[];
  currentTeam: TeamAuctionHeaderProps;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSendBid: (bid: number) => void;
};

type RoomStateProps = {
  roomId: string;
  phase: number;
  settings: {
    defaultBid: number;
    teamsMode: string;
    totalPurse: number;
    timePerPlayer: number;
  };
  players: Record<string, Participant>;
  timer: {
    isActive: boolean;
    currentTime: number;
  };
  teamAuction: {
    teams: Record<
      string,
      {
        name: string;
        basePrice: number;
        soldTo: string;
        soldPrice: number;
      }
    >;
    currentTeamId: string;
    highestBid: number;
    highestBidderId: string;
  };
};
