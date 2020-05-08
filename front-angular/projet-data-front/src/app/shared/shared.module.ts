import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [GraphComponent, SidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [GraphComponent, SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class SharedModule { }
