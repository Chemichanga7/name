import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/Config/app.config';
import {HelloWindow} from "./app/Hello-Window/app.hellowindow";

bootstrapApplication(HelloWindow, appConfig)
  .catch((err) => console.error(err));
