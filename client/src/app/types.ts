export interface IRoomMessage {
    room: string;
    messageId: string;
  }

export interface IWebSocketMessageData {
  data: string, userId: number
}

export interface IMessageListItem { data: string, userId: number }