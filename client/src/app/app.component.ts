import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'socket-client';
  message = '';
  // messages: string[] = []
  messages: { data: string, userId: number}[] = [];
  socket;
  userId: number;
  constructor(private router: Router) {
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

  handleUserChange(userId: number){
    this.userId = userId;
    console.log('Yeah buddy', userId)
  }
}

