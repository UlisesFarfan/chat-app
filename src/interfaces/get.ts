export interface PropsGet {
  token?: string;
  id?: string;
  signal?: AbortSignal;
  userName?: string;
  userId?: string;
  secUserId?: string;
  typeChat?: string;
  chatId?: string;
  action?: string;
  body?: any;
  otherUser?: string;
  email?: string;
}