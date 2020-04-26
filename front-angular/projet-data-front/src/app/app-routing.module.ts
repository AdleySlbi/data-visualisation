import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Component 
import { HomeConseillerComponent } from "./home-conseiller/home-conseiller/home-conseiller.component";
import { TestGraphComponent } from './test-graph/test-graph.component';

const routes = [
  {
    path: '',
    component: HomeConseillerComponent
  },
  {
    path: 'graph',
    component: TestGraphComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
