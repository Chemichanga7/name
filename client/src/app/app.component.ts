import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'socket-client';
  message = '';
  messages: string[] = []
  socket;
  constructor() {
    this.socket = io("ws://localhost:80/chat");
    this.socket.on('message', (message) => {
      console.log(message)
      this.messages.push(message.data)
    })
  }
  handleSubmitNewMessage() {
    this.socket.emit('message', { data: this.message })
  }
}

