import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { NgFor } from "@angular/common";


@Component({
  selector: 'app-room',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.room.html',
  styleUrl: './app.room.scss'
})
export class RoomComponent {

}
