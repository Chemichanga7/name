import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { io } from 'socket.io-client';
import {AppRoutingModule} from "./app.routes";

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, RouterLink, RouterLinkActive, AppRoutingModule],
  templateUrl: './app.room.html',
  styleUrl: './app.room.scss'
})
export class RoomComponent {
  title = 'socket-client';
  message = '';
  messages: { data: string, userId: number }[] = [];
  socket;
  userId: number;
  constructor() {
    this.userId = 0
    this.socket = io("ws://localhost:80/chat");
    this.socket.on('message', (message) => {
      console.log(message)
      this.messages.push(message.data)
    })
  }
  handleSubmitNewMessage() {
    this.socket.emit('message', { data: this.message, userId: this.userId })
  }
}

