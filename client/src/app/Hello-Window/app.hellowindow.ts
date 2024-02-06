import {Component} from "@angular/core";
import {RouterLink, RouterOutlet} from "@angular/router";
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
}
