import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './graph/graph.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [GraphComponent, HeaderComponent, SidebarComponent],
  imports: [
    CommonModule
  ],
  exports: [GraphComponent, HeaderComponent, SidebarComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class SharedModule { }
