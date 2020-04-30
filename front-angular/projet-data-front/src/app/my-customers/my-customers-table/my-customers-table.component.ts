import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-customers-table',
  templateUrl: './my-customers-table.component.html',
  styleUrls: ['./my-customers-table.component.scss']
})
export class MyCustomersTableComponent implements OnInit {

  @Input() my_customers;
  
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  private paginator: MatPaginator;
  private sort: MatSort;
  public dataSource: MatTableDataSource<any>;

  columnsToDisplay = [ 'name', 'customersince', 'zipcode', 'niveau', 'categorie', 'ratioconso'];

  constructor() { }

  ngOnInit(): void {
    // Utilisation du `MatTableDataSource` pour pouvoir ajouter les filtres + pagination 
    this.dataSource = new MatTableDataSource(this.my_customers);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // if (this.paginator && this.sort) {
    //   this.applyFilter('');
    // }
  }


}
