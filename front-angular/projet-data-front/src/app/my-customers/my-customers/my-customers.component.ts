import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-my-customers',
  templateUrl: './my-customers.component.html',
  styleUrls: ['./my-customers.component.scss']
})
export class MyCustomersComponent implements OnInit {

  public my_customers;

  constructor(
    private apiservice: ApiService,
  ) { }

  ngOnInit(): void {
    this.getMyCustomers();
  }

  getMyCustomers(){
    this.apiservice.getMesClients().subscribe((data) => {
      this.my_customers = data;
    })
  }

}
