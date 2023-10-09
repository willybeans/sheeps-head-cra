export interface ChatProps {
  messages: Messages;
}

export interface Messages {
  [key: string]: string;
}

export type ApiMessage = {
  chat_room_id: string;
  user_name: string;
  user_id: string;
  content: string;
  id: string;
  sent_at: string;
  contentType: 'chat' | 'game';
};

export interface MessageBody {
  time: string;
  name: string;
  content: string;
}

export type ChatFeed = MessageBody[];

export type WebSocketSend = (
  data: string | ArrayBufferLike | Blob | ArrayBufferView
) => void;
