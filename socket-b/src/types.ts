export interface IRoomMessage {
  room: string;
  messageId: string;
}

export interface IWebSocketMessageData {
data: string, userId: number
}

export interface IEditMessage {
  userId: any;
  data: string;
  roomId: string;
  id: number;
}