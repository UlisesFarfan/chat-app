export interface PropsMessage {
  message: string;
  user: string;
  chatId: string;
  date: Date;
};

export interface PropsPostMessage {
  token: string;
  body: PropsMessage;
};

export interface PropsDeleteMessage {
  token: string;
  id: string;
};

export interface UserChat {
  name: string;
  _id: string;
};

export interface ChatInterface {
  _id: string;
  users: Array<UserChat>;
  nessagesId: Array<Object>;
  messageToView: boolean;
};

export interface ChatItemProps {
  name: string;
  index: string;
  newMessage: boolean;
  online: boolean;
  onClick: () => void;
};

export interface ContextProps {
  x: number;
  y: number;
  show: boolean;
};

export interface MessageProps {
  message: string;
  user: any;
  date: Date;
  _delete: boolean;
  messageId: string;
};

export interface ContactItemProps {
  name: string;
  description: string;
  userId: string;
};