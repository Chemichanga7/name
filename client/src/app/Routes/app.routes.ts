import {RouterModule, Routes} from '@angular/router';
import { RoomComponent } from "../Room/app.room";
import { NgModule } from "@angular/core";
import { EnterComponent } from '../Enter/app.enter';

export const routes: Routes = [
  { path: 'enter', component: EnterComponent },
  { path: 'room', component: RoomComponent },
  { path: '**', redirectTo: "enter" }
]

