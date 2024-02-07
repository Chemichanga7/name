/* eslint-disable prettier/prettier */
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IDeleteMessageDto, IEditMessageDto, IEventDto, IWebSocketSubscribeData } from "./types";
import { Socket } from "socket.io";

@WebSocketGateway(80,{
  namespace: "chat", cors: true
}) // Определение класса в качестве шлюза WebSocket
export class ChatGateway {
  currentMessageId = 1;
  
  @WebSocketServer() // Декоратор для получения экземпляра сервера WebSocket
  server; // Поле для хранения сервера

  @SubscribeMessage('message') // Декоратор для подписки на сообщения с определенным именем
  handleMessage(@MessageBody() message: IEventDto): void { // Обработчик для получения и обработки сообщений
    this.server.to(message.roomId).emit('message', {...message, id: this.currentMessageId++}); // Отправка сообщения всем подключенным клиентам
  }

  // всё что дальше тестовая версия происходящего

  @SubscribeMessage('subscribe') // Декоратор для подписки на событие "подписаться"
  handleSubscribe(client: Socket, room: IWebSocketSubscribeData): void { // Обработчик для подписки на событие (поток)
    client.join(room.roomId); // Присоединение клиента к комнате (потоку)
  }

  @SubscribeMessage('unsubscribe') // Декоратор для подписки на событие "отписаться"
  handleUnsubscribe(@MessageBody() room: string): void { // Обработчик для отписки от события (потока)
    this.server.leave(room); // Отсоединение клиента от комнаты (потока)
  }

  @SubscribeMessage('deleteMessage') // Декоратор для подписки на событие "удалить сообщение"
  handleDeleteMessage(@MessageBody() data: IDeleteMessageDto): void { // Обработчик для удаления сообщения
    const { room, messageId } = data;
    // Логика удаления сообщения
    this.server.to(room).emit('messageDeleted', messageId); // Отправка события о удалении сообщения всем клиентам в комнате (потоке)
  }

  @SubscribeMessage('editMessage') // Декоратор для подписки на событие "редактировать сообщение"
  handleEditMessage(@MessageBody() message: IEditMessageDto): void { // Обработчик для редактирования сообщения
    this.server.to(message.roomId).emit('message', message); // Отправка сообщения всем подключенным клиентам
  }
}
