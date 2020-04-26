import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCustomersComponent } from './my-customers/my-customers.component';



@NgModule({
  declarations: [MyCustomersComponent],
  imports: [
    CommonModule
  ],
  exports: [MyCustomersComponent]
})
export class MyCustomersModule { }
