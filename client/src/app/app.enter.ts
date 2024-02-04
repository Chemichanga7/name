import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-enter',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './app.enter.html',
  styleUrl: './app.enter.scss',
})
export class EnterComponent {
  userId = 1;
  roomId = 1;
}
