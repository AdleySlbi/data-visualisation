import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [GraphComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [GraphComponent, HeaderComponent]
})
export class SharedModule { }
