export interface IWebSocketSubscribeData {
  roomId: string;
}

export interface IWebSocketEventDto {
  roomId: string;
  type: 'create' | 'update' | 'remove';
  data: any;
}
