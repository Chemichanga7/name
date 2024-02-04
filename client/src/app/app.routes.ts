import {RouterModule, Routes} from '@angular/router';
import { RoomComponent } from "./app.room";
import { NgModule } from "@angular/core";
import { EnterComponent } from './app.enter';

export const routes: Routes = [
  { path: 'enter', component: EnterComponent },
  { path: 'room/:userid', component: RoomComponent },
  { path: '**', redirectTo: "enter" }
]

