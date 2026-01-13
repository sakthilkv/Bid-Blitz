type ParticipantStatus = 'joined' | 'ready';

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
  status: ParticipantStatus;
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

type Teams = {
  id: string;
  name: string;
  logo?: string;
  status: TeamStatus;
  price?: number;
  owner?: string;
  avatar?: string;
};

type TeamsTableProps = {
  teams: Teams[];
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
  teams: Teams[];
  currentTeam: TeamAuctionHeaderProps;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onSendBid: (bid: number) => void;
};

type PlayerStatus = 'sold' | 'unsold';
type PlayerRole = 'batsman' | 'bowler' | 'allrounder';

type Player = {
  id: string;
  name: string;
  role: PlayerRole;
  overseas?: boolean;
  status: PlayerStatus;
  price?: number;
  team?: string;
};

type PlayersTableProps = {
  players: Player[];
};

type PlayerAuctionHeader = {
  playerName: string;
  overseas: boolean;
  currentBid: number;
  currentBidder: string;
  timeLeft: number;
  totalTime?: number;
  status?: 'bidding' | 'ended';
  basePrice: number;
};

type PlayerAuctionProps = {
  phase: number;
  playerID: string;
  userInfo: UserInfoCardProps;
  players: Player[];
  currentPlayer: any;
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
