import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Component 
import { HomeConseillerComponent } from "./home-conseiller/home-conseiller/home-conseiller.component";

const routes = [
  { path: 'conseiller', component: HomeConseillerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
