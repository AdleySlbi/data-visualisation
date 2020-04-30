import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCustomersComponent } from './my-customers/my-customers.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { MyCustomersTableComponent } from './my-customers-table/my-customers-table.component';



@NgModule({
  declarations: [MyCustomersComponent, MyCustomersTableComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [MyCustomersComponent, MyCustomersTableComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyCustomersModule { }
