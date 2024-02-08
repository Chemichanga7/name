import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { io } from 'socket.io-client';
import {IDeleteMessageDto, IMessageListItem, IWebSocketMessageData} from '../Types/types';

let id = Math.floor(1000000 * Math.random());

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './app.room.html',
  styleUrl: './app.room.scss',
})
export class RoomComponent {
  title = 'socket-client';
  message = '';
  messages: IMessageListItem[] = [];
  socket;
  userId: number;
  roomId: number;

  currentEditMessage?: IMessageListItem;
  editedMessageText: string = '';

  constructor(private route: ActivatedRoute) {
    this.userId = route.snapshot.queryParams['userId'];
    this.roomId = route.snapshot.queryParams['roomId'];
    this.socket = io('ws://localhost:80/chat');
    this.socket.emit('subscribe', { userId: this.userId, roomId: this.roomId });
    this.socket.on('message', (message: IWebSocketMessageData) => {
      console.log(message);
      this.messages.push(message);
    });
    this.socket.on('deleteMessage', (data: { id: number }) => {
      this.deleteMessage(this.messages.find(item => item.id === data.id))
    })
  }

  handleSubmitNewMessage() {
    this.emit({
      id: id++,
      data: this.message,
      userId: this.userId,
      roomId: this.roomId,
    });
    this.message = '';
  }

  openEditMessage(message: IMessageListItem) {
    message.showOptions = false;
    this.currentEditMessage = message;
    this.editedMessageText = message.data;
  }

  updateMessage() {
    if(!this.currentEditMessage) return
    this.currentEditMessage.data = this.editedMessageText;
    this.emitEditMessage(this.currentEditMessage);
    this.currentEditMessage = undefined;
  }

  cancelUpdate(){
    this.currentEditMessage = undefined;
  }

  confirmDeleteMessage(message: any){
    const confirmDelete = confirm('Вы точно хотите удалить сообщение?');
    if(confirmDelete){
      const index = this.messages.indexOf(message)
      if(index !== -1){
        const messageId = message.id;
        this.emitDeleteMessage({
          userId: message.userId,
          data: message.data,
          roomId: message.roomId,
          id: messageId
        });
      }
    }
  }

  deleteMessage(message?: IMessageListItem){
    this.messages = this.messages.filter(msg => msg !== message)
  }

  toggleOptions(message: any) {
    message.showOptions = !message.showOptions;
  }

  private emit(data: IWebSocketMessageData) {
    this.socket.emit('message', data);
  }

  private emitEditMessage(data: IWebSocketMessageData) {
    this.socket.emit('editMessage', data);
  }

  private emitDeleteMessage(data: IDeleteMessageDto){
    this.socket.emit('deleteMessage', data)
  }
}
