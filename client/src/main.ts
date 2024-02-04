import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {HelloWindow} from "./app/app.hellowindow";

bootstrapApplication(HelloWindow, appConfig)
  .catch((err) => console.error(err));
