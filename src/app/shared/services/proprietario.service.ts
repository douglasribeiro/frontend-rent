import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from 'src/app/shared/model/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  proprietarioURL: string = "http://localhost:8080/api/proprietario";

  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json', 'ativo': 'true'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get(this.proprietarioURL + '/client-ativo/', this.httpOptions);
  }

  getListProrpietario(): Observable<Proprietario[]>{
    return this.httpClient.get<any>(this.proprietarioURL + "/client-ativo/", this.httpOptions);
  }

  getProrpietarioById(xval: String): Observable<Proprietario>{
    return this.httpClient.get<any>(this.proprietarioURL + "/" + xval, this.httpOptions);
  }

  postProrpietario(prorietario: Proprietario){
    return this.httpClient.post<any>(this.proprietarioURL+"/novo", prorietario, this.httpOptions);
  }

  public putProrpietario(id: number, proprietario: Proprietario): Observable<any> {
    return this.httpClient.put<any>(this.proprietarioURL + `/${id}`, proprietario, this.httpOptions);
  }

  public deleteProrpietario(id: number): Observable<any> {
    console.log(this.proprietarioURL + `${id}`);
    return this.httpClient.delete<any>(this.proprietarioURL + `/${id}`, this.httpOptions)
  }

}
