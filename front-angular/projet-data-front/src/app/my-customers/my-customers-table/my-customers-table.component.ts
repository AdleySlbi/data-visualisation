import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

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
  public total_client;

  // Ce qu'il y a à afficher dans le tableau
  columnsToDisplay = ['name', 'date_installation', 'departement', 'zipcode', 'niveau', 'categorie', 'ratio'];

  constructor() { }

  ngOnInit(): void {
    // Execute la fonction qui va faire le ratio conso puis créer le tableau
    this.ratioConso();
    this.total_client = this.num_client;
  }

  // Pour pouvoir utiliser le filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Pour faire fonctionner le Paginator et le sort
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  /**
   * Fonction qui permet de calculer le ratio de consommation d'un utilisateur.
   * 
   */
  num_client;
  ratioConso() {
    // Variable i afin d'évoluer dans le tableau
    this.num_client = 0;
    // Boucler sur chaque élément du tableau
    this.my_customers.forEach(element => {
      // Calcul, ratioConsoOne est le résultat du calcul 
      let ratioConsoOne = ((element.gtc / (element.gtc + element.gtg)) * 100);
      // Récupérer la position
      let the_customer = this.my_customers[this.num_client];
      // Affecter le résultat du calcul 
      if (ratioConsoOne > 0 && ratioConsoOne < 20) {
        the_customer["ratio"] = '5 - Faible';
        the_customer["ratio_number"] = ratioConsoOne;
      } if (ratioConsoOne > 20 && ratioConsoOne < 40) {
        the_customer["ratio"] = '4 - Passable';
        the_customer["ratio_number"] = ratioConsoOne;
      } if (ratioConsoOne > 40 && ratioConsoOne < 60) {
        the_customer["ratio"] = '3 - Satisfaisant';
        the_customer["ratio_number"] = ratioConsoOne;
      } if (ratioConsoOne > 60 && ratioConsoOne < 80) {
        the_customer["ratio"] = '2 - Très bien';
        the_customer["ratio_number"] = ratioConsoOne;
      } if (ratioConsoOne > 80 && ratioConsoOne < 100) {
        the_customer["ratio"] = '1 - Excellent';
        the_customer["ratio_number"] = ratioConsoOne;
      }

      this.num_client = this.num_client + 1;
    });
    // Affectation et Utilisation du `MatTableDataSource` pour pouvoir créer le tableau et ajouter les filtres + pagination 
    this.dataSource = new MatTableDataSource(this.my_customers);
  }

}