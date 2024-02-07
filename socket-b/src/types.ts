export interface IDeleteMessageDto {
  room: string;
  messageId: string;
}

export interface IWebSocketMessageData {
data: string, userId: number
}

export interface IEditMessageDto {
  userId: any;
  data: string;
  roomId: string;
  id: number;
}

export interface IWebSocketSubscribeData {
  userId: any;
  roomId: string;
}

export interface IEventDto {
  userId: any;
  data: string;
  roomId: string;
}