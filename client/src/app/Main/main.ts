import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '../Config/app.config';
import {HelloWindow} from "../Hello-Window/app.hellowindow";

bootstrapApplication(HelloWindow, appConfig)
  .catch((err) => console.error(err));
