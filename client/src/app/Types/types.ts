export interface IMessageListItem {
  data: string;
  userId: number;
  showOptions?: boolean;
  id: number;
  roomId: string;
}

export interface IWebSocketSubscribeData {
  roomId: string;
}
export interface IWebSocketEventDto {
  roomId: string;
  type: 'create' | 'update' | 'remove';
  data: any;
}
