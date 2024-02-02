/* eslint-disable prettier/prettier */
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway(80,{
    namespace: "chat", cors: true
}) // Определение класса в качестве шлюза WebSocket
export class ChatGateway {
  @WebSocketServer() // Декоратор для получения экземпляра сервера WebSocket
  server; // Поле для хранения сервера

  @SubscribeMessage('message') // Декоратор для подписки на сообщения с определенным именем
  handleMessage(@MessageBody() message: string): void { // Обработчик для получения и обработки сообщений
    this.server.emit('message', message); // Отправка сообщения всем подключенным клиентам
  }
}