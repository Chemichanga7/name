export interface IWebSocketMessageData {
  id?: number;
  data: string;
  userId: number;
  roomId: number;
}

export interface IMessageListItem {
  data: string;
  userId: number;
  showOptions?: boolean;
}

export interface IWebSocketSubscribeData {
  userId: any;
  roomId: string;
}

export interface IDeleteMessageDto {
  userId: string;
  data: string;
  roomId: string;
  id: number;
}
