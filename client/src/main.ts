import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {RoomComponent} from "./app/app.room";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
