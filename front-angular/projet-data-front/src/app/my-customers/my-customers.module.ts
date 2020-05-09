import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

// Materials
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

// Component 
import { MyCustomersComponent } from './my-customers/my-customers.component';
import { MyCustomersTableComponent } from './my-customers-table/my-customers-table.component';
import { MyCustomersFilterComponent } from './my-customers-filter/my-customers-filter.component';

import { ReactiveFormsModule } from '@angular/forms';

import { from } from 'rxjs';
import { MyCustomersNewListComponent } from './my-customers-new-list/my-customers-new-list.component';



@NgModule({
  declarations: [MyCustomersComponent, MyCustomersTableComponent, MyCustomersFilterComponent, MyCustomersNewListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [MyCustomersComponent, MyCustomersTableComponent, MyCustomersFilterComponent, MyCustomersNewListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyCustomersModule { }
