import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule} from '@angular/material/card'; 

@Component({
  selector: 'app-my-customers-new-list',
  templateUrl: './my-customers-new-list.component.html',
  styleUrls: ['./my-customers-new-list.component.scss']
})
export class MyCustomersNewListComponent implements OnInit {

  public columnsToDisplay;
  public dataSource: MatTableDataSource<any>;


  constructor(public dialogRef: MatDialogRef<MyCustomersNewListComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.columnsToDisplay = ['name', 'date_installation', 'departement', 'niveau', 'ratio'];
    this.dataSource = new MatTableDataSource(this.data);
  }

}
