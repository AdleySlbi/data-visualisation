import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // APILink = "http://localhost:3000/api";
  // APILink = "https://api.solcast.com.au/rooftop_sites/bf92-b91e-170c-f1e9/forecasts?format=json";
  
  APILink = "http://localhost:3000/solcasttest";

  public getApi() {
    console.log("this is the service");
    console.log(this.http.get(this.APILink));
    return this.http.get(this.APILink);
  }
}
