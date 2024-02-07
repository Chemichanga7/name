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
import { IMessageListItem, IWebSocketMessageData } from '../Types/types';

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
  }

  openEditMessage(message: any) {
    this.currentEditMessage = message;
  }

  updateMessage() {
    this.emitEditMessage(this.currentEditMessage);
    this.currentEditMessage = undefined;
  }

  private emit(data: IWebSocketMessageData) {
    this.socket.emit('message', data);
  }

  private emitEditMessage(data: IWebSocketMessageData) {
    this.socket.emit('editMessage', data);
  }
}
