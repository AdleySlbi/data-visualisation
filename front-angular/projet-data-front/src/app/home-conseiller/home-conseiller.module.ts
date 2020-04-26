import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConseillerComponent } from './home-conseiller/home-conseiller.component';
import { SharedModule } from '../shared/shared.module';

import { MatCardModule } from '@angular/material/card';
import { HomeConseillerWelcomeComponent } from './home-conseiller-welcome/home-conseiller-welcome.component';


@NgModule({
  declarations: [HomeConseillerComponent, HomeConseillerWelcomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule
  ],
  exports: [HomeConseillerComponent, HomeConseillerWelcomeComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeConseillerModule { }
