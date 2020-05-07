import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-customers-filter',
  templateUrl: './my-customers-filter.component.html',
  styleUrls: ['./my-customers-filter.component.scss']
})
export class MyCustomersFilterComponent implements OnInit {

  @Output() filterToPass = new EventEmitter();


  constructor() { }

  testOnClick() {
    console.log("test")
  }

  ngOnInit(): void {
  }

  printTheValue(elementValue) {
    console.log(elementValue);
  }

  formForSelect = new FormGroup({
    filter: new FormControl('')
  });

  listeFiltre = [];

  // Pour le select, on a besoin d'un formmulaire 
  onSubmit(){
    // Pour ajouter un filtre à la liste des filtres
    this.listeFiltre.push(this.formForSelect.value);
    this.filterToPass.emit(this.listeFiltre);
  }

  // @ ToDo
  // deleteFilter pour supprimer un filtre quand on click sur la croix
  deleteFilter(filterToDelete){
    // this.listeFiltre = this.listeFiltre
    
  }

}
