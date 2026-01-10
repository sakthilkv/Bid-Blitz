type Participant = {
  uid: string;
  name: string;
  avatar: string;
  status: 'joined' | 'ready';
  isHost?: boolean;
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
