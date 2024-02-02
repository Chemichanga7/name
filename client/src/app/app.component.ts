import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'socket-client';
  message = '';
  socket;
  constructor() {
    this.socket = io("ws://localhost:80/mqtt");
  }
  handleSubmitNewMessage() {
    this.socket.emit('message', { data: this.message })
  }
}

