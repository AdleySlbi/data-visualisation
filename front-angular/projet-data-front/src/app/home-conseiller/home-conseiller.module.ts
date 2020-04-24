import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeConseillerComponent } from './home-conseiller/home-conseiller.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [HomeConseillerComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [HomeConseillerComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeConseillerModule { }
