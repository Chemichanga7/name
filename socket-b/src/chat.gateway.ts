/* eslint-disable prettier/prettier */
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { IDeleteMessageDto, IEditMessageDto, IEventDto, IWebSocketSubscribeData } from "./types";
import { Socket } from "socket.io";

// @WebSocketGateway(80,{
//   namespace: "chat", cors: true
// }) 
// export class ChatGateway {
//   currentMessageId = 1;
  
//   @WebSocketServer() 
//   server; 

//   @SubscribeMessage('subscribe') // Декоратор для подписки на событие "подписаться"
//   handleSubscribe(client: Socket, room: IWebSocketSubscribeData): void { // Обработчик для подписки на событие (поток)
//     client.join(room.roomId); // Присоединение клиента к комнате (потоку)
//   }

//   @SubscribeMessage('unsubscribe') // Декоратор для подписки на событие "отписаться"
//   handleUnsubscribe(@MessageBody() room: string): void { // Обработчик для отписки от события (потока)
//     this.server.leave(room); // Отсоединение клиента от комнаты (потока)
//   }

//   @SubscribeMessage('message') 
//   handleMessage(@MessageBody() message: IEventDto): void { 
//     this.server.to(message.roomId).emit('message', {...message, id: this.currentMessageId++});
//   }

//   @SubscribeMessage('deleteMessage')
//   handleDeleteMessage(@MessageBody() data: IDeleteMessageDto): void {
//     const { userId, data: messageData, roomId, id } = data;
//     this.server.to(roomId).emit('deleteMessage', { id });
//   }

//   @SubscribeMessage('editMessage') 
//   handleEditMessage(@MessageBody() message: IEditMessageDto): void {
//     this.server.to(message.roomId).emit('editMessage', message);
//   }
// }

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

  @SubscribeMessage('roomEvent') // Подписываем метод на событие 'roomSubscription'
  handleRoomSubscription(client: Socket, data: IWebSocketSubscribeData): void { // Обработчик для события 'roomSubscription'
    const { type, userId, data: messageData, roomId, id } = data; // Деструктуризация объекта data
  
    switch (type) { // Проверка значения свойства type
      case 'message': // Если type равен 'message'
        this.handleMessage(client, data); // Вызываем метод handleMessage
        break;
      case 'deleteMessage': // Если type равен 'deleteMessage'
        this.handleDeleteMessage(client, data); // Вызываем метод handleDeleteMessage
        break;
      case 'editMessage': // Если type равен 'editMessage'
        this.handleEditMessage(client, data); // Вызываем метод handleEditMessage
        break;
      default:
        console.log('Неизвестный тип сообщения:', type); // Выводим сообщение в консоль, если type не распознан
    }
  }
  
  handleMessage(client: Socket, data: IWebSocketSubscribeData): void { // Обработчик для события 'message'
    const { roomId } = data; // Деструктуризация объекта data и извлечение свойства roomId
    const messageId = this.currentMessageId++; // Генерация messageId и инкремент currentMessageId
    this.server.to(roomId).emit('message', { ...data, id: messageId }); // Отправка сообщения с событием 'message' в комнату roomId
  }
  
  handleDeleteMessage(client: Socket, data: IWebSocketSubscribeData): void { // Обработчик для события 'deleteMessage'
    const { roomId, id } = data; // Деструктуризация объекта data и извлечение свойств roomId и id
    this.server.to(roomId).emit('deleteMessage', { id }); // Отправка сообщения с событием 'deleteMessage' в комнату roomId
  }
  
  handleEditMessage(client: Socket, data: IWebSocketSubscribeData): void { // Обработчик для события 'editMessage'
    const { roomId, data: messageData } = data; // Деструктуризация объекта data и извлечение свойств roomId и data, присваиваем значение свойства data переменной messageData
    this.server.to(roomId).emit('editMessage', messageData); // Отправка сообщения с событием 'editMessage' в комнату roomId
  }
}
