/* eslint-disable prettier/prettier */
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IWebSocketEventDto, IWebSocketSubscribeData } from './types';
import { Socket } from 'socket.io';

@WebSocketGateway(80, {
  namespace: 'chat',
  cors: true,
})
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('subscribe') // Декоратор для подписки на событие "подписаться"
  handleSubscribe(client: Socket, data: IWebSocketSubscribeData): void {
    // Обработчик для подписки на событие (поток)
    client.join(data.roomId); // Присоединение клиента к комнате (потоку)
    this.countClientsInRoom(data.roomId)
  }

  @SubscribeMessage('unsubscribe') // Декоратор для подписки на событие "отписаться"
  handleUnsubscribe(client: Socket, data: IWebSocketSubscribeData): void {
    // Обработчик для отписки от события (потока)
    client.leave(data.roomId); // Отсоединение клиента от комнаты (потока)
  }

  @SubscribeMessage('events') // Подписываем метод на событие 'roomSubscription'
  handleRoomSubscription(@MessageBody() data: IWebSocketEventDto): void {
    this.server.to(data.roomId).emit('event', data); // Отправка сообщения с событием 'message' в комнату roomId
  }

  countClientsInRoom(roomId: string){
    const clients = this.server.adapter.rooms.get(roomId);
    console.log(clients)
    if(clients){
      const numClients = clients.size;
      console.log(`Number of clients in room ${ roomId }: ${ numClients }`);
    } else {
      console.log(`Room ${ roomId } doesn't exist or has no clients.`);
    }
  }
}
