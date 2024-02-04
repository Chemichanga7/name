import {RouterModule, Routes} from '@angular/router';
import { RoomComponent } from "./app.room";
import { NgModule } from "@angular/core";

export const routes: Routes = [
  { path: 'room', component: RoomComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
