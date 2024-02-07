export interface IDeleteMessageDto {
  userId: string;
  data: string;
  roomId: string;
  id: number;
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