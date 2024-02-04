import {Component} from "@angular/core";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { NgFor } from "@angular/common";

@Component({
  selector: 'app-hellowindow',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor, RouterLink],
  templateUrl: './app.hellowindow.html',
  styleUrl: './app.hellowindow.scss'
})
export class HelloWindow {
  userId: number;

  constructor() {
    this.userId = 0;
  }
  handleUserChange(userId: number){
    this.userId = userId;
    console.log('Yeah buddy', userId)
  }
}
