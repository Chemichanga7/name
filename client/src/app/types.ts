export interface IRoomMessage {
  room: string;
  messageId: string;
}

export interface IWebSocketMessageData {
  id?: number;
  data: string;
  userId: number;
  roomId: number;
}

export interface IMessageListItem {
  data: string;
  userId: number;
}
