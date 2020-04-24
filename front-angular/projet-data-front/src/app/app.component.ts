import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
// import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet-data';

  outputApi = null;
  
  constructor(
    private apiservice: ApiService,
  ){}

  ngOnInit() {
    this.showApi();
  }

  showApi(){
    this.apiservice.getApi().subscribe((data) => {
      this.outputApi = data;
    } );
  }

}


