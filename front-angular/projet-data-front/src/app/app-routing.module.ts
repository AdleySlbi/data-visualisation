import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

// Component 
import { HomeConseillerComponent } from "./home-conseiller/home-conseiller/home-conseiller.component";
import { TestGraphComponent } from './test-graph/test-graph.component';
import { MyCustomersComponent } from './my-customers/my-customers/my-customers.component';

const routes = [
  {
    path: '',
    component: HomeConseillerComponent
  },
  {
    path: 'graph',
    component: TestGraphComponent
  },
  {
    path: 'my-customers',
    component: MyCustomersComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
