import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  cursoURL: string = "https://viacep.com.br/ws/"

  constructor(private httpClient: HttpClient) { }

  public pesquisa(cep: any): Observable<any> {
    //console.log("URL ", this.cursoURL)
    return this.httpClient.get(this.cursoURL+ cep + '/json');
  }

}
