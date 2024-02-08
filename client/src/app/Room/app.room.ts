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
import { IMessageListItem, IWebSocketEventDto } from '../Types/types';

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
  roomId: string;

  currentEditMessage?: IMessageListItem;
  editedMessageText: string = '';

  constructor(private route: ActivatedRoute) {
    this.userId = route.snapshot.queryParams['userId'];
    this.roomId = route.snapshot.queryParams['roomId'];
    this.socket = io('ws://localhost:80/chat');
    this.socket.emit('subscribe', { userId: this.userId, roomId: this.roomId });
    this.socket.on('event', (event: IWebSocketEventDto) => {
      switch (event.type) {
        case 'create':
          this.messages.push(event.data.message);
          break;
        case 'remove':
          this.deleteMessage(
            this.messages.find(
              (message) => message.id === event.data.message.id
            )
          );
          break;
      }
    });
  }

  handleSubmitNewMessage() {
    this.emit({
      type: 'create',
      data: {
        message: {
          id: id++,
          data: this.message,
          userId: this.userId,
          roomId: this.roomId,
        },
      },
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
    if (!this.currentEditMessage) return;
    this.currentEditMessage.data = this.editedMessageText;
    this.emit({
      type: 'update',
      data: {
        message: this.currentEditMessage,
      },
      roomId: this.currentEditMessage.roomId,
    });
    this.currentEditMessage = undefined;
  }

  cancelUpdate() {
    this.currentEditMessage = undefined;
  }

  confirmDeleteMessage(message: IMessageListItem) {
    const confirmDelete = confirm('Вы точно хотите удалить сообщение?');
    if (confirmDelete) {
      const index = this.messages.indexOf(message);
      if (index !== -1) {
        this.emit({
          type: 'remove',
          data: {
            message,
          },
          roomId: message.roomId,
        });
      }
    }
  }

  deleteMessage(message?: IMessageListItem) {
    this.messages = this.messages.filter((msg) => msg !== message);
  }

  toggleOptions(message: any) {
    message.showOptions = !message.showOptions;
  }

  private emit(data: IWebSocketEventDto) {
    this.socket.emit('events', data);
  }
}
