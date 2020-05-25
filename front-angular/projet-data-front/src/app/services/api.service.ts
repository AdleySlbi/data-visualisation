import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  APILink = "http://localhost:3000/solcasttest";

  public getApi() {
    return this.http.get(this.APILink);
  }

  public getMesClients() {
    return this.http.get(`http://localhost:3000/mes-clients`);
  }

  // Lien vers l'exemple avec filtre
  public getMesClientsFilter(){
    return this.http.get(`http://localhost:3000/mes-clients-filter`)
  }

  // Créer une nouvelle liste de client 
  public addListe(){

  }

}
