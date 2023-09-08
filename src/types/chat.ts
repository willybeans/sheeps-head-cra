export interface ChatProps {
  messages: Messages;
}

export interface Messages {
  [key: string]: string;
}

export interface MessageBody {
  time: string;
  name: string;
  content: string;
}
