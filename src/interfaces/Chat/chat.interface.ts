export interface PropsMessage {
  message: string;
  user: string;
  chatId: string;
}

export interface PropsPostMessage {
  headers: string;
  body: PropsMessage;
}

export interface Chat {
  _id: string;
  users: Array<Object>;
  nessagesId: Array<Object>;
  messageToView: boolean;
}

export interface ChatItem {
  name: string;
  index: string;
  newMessage: boolean;
  online: boolean;
  onClick: () => void;
}

export interface ContextProps {
  x: number;
  y: number;
  show: boolean;
}

export interface MessageProps {
  message: string;
  user: any
}

export interface ContactItemProps {
  name: string;
  description: string;
  index: number;
}