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

  currentEditMessage?: any;
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
  }

  handleSubmitNewMessage() {
    this.emit({
      data: this.message,
      userId: this.userId,
      roomId: this.roomId,
    });
    this.message = '';
  }

  openEditMessage(message: any) {
    message.showOptions = false;
    this.currentEditMessage = message;
    this.editedMessageText = message.data;
  }

  updateMessage() {
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
      this.deleteMessage(message);
    }
  }

  deleteMessage(message: any){
    const index = this.messages.indexOf(message)
    if(index !== -1){
      const messageId = message.id;
      this.messages.splice(index, 1);
      this.emitDeleteMessage({
        userId: message.userId,
        data: message.data,
        roomId: message.roomId,
        id: messageId
      });
    }
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
