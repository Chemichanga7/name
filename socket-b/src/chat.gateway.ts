/* eslint-disable prettier/prettier */
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IDeleteMessageDto, IEditMessageDto, IEventDto, IWebSocketSubscribeData } from "./types";
import { Socket } from "socket.io";

@WebSocketGateway(80,{
  namespace: "chat", cors: true
}) 
export class ChatGateway {
  currentMessageId = 1;
  
  @WebSocketServer() 
  server; 

  @SubscribeMessage('subscribe') // Декоратор для подписки на событие "подписаться"
  handleSubscribe(client: Socket, room: IWebSocketSubscribeData): void { // Обработчик для подписки на событие (поток)
    client.join(room.roomId); // Присоединение клиента к комнате (потоку)
  }

  @SubscribeMessage('unsubscribe') // Декоратор для подписки на событие "отписаться"
  handleUnsubscribe(@MessageBody() room: string): void { // Обработчик для отписки от события (потока)
    this.server.leave(room); // Отсоединение клиента от комнаты (потока)
  }

  @SubscribeMessage('message') 
  handleMessage(@MessageBody() message: IEventDto): void { 
    this.server.to(message.roomId).emit('message', {...message, id: this.currentMessageId++});
  }

  @SubscribeMessage('deleteMessage')
  handleDeleteMessage(@MessageBody() data: IDeleteMessageDto): void {
    const { userId, data: messageData, roomId, id } = data;
    this.server.to(roomId).emit('deleteMessage', id);
  }

  @SubscribeMessage('editMessage') 
  handleEditMessage(@MessageBody() message: IEditMessageDto): void { 
    this.server.to(message.roomId).emit('editMessage', message);
  }
}
