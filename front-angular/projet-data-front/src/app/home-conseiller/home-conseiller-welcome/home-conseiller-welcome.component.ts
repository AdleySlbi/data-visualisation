import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home-conseiller-welcome',
  templateUrl: './home-conseiller-welcome.component.html',
  styleUrls: ['./home-conseiller-welcome.component.scss']
})
export class HomeConseillerWelcomeComponent implements OnInit {

  name = "Adley";
  dateToday = Date.now();

  datePipeString : string;

  
  constructor(private datePipe: DatePipe) {
    this.datePipeString = datePipe.transform(Date.now(), 'EEEE, d MMMM, y');
    console.log(this.datePipeString);
   }

  dateShow;

  ngOnInit(): void {
    console.log(this.dateToday);
    this.dateShow = this.dateToday; 
  }

}
