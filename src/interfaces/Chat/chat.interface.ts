export interface PropsGet {
  headers: string;
  id: string
}

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
  messageToView: Boolean;
}