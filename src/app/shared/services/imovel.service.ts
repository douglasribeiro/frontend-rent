import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovel } from 'src/app/shared/model/imovel';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  imovelURL: string = "http://localhost:8080/api/"

  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json', 'ativo': 'true'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    return this.httpClient.get(this.imovelURL + 'imovel/client-ativo/', this.httpOptions);
  }

  getListImovel(): Observable<Imovel[]>{
    return this.httpClient.get<any>(this.imovelURL + "imovel/client-ativo/", this.httpOptions);
  }

  getImovelById(xval: String): Observable<Imovel>{
    return this.httpClient.get<any>(this.imovelURL+"imovel/"+xval, this.httpOptions);
  }

  postImovel(imovel: Imovel){
    return this.httpClient.post<any>(this.imovelURL+"imovel/novo", imovel, this.httpOptions);
  }

  public putImovel(id: number, imovel: Imovel): Observable<any> {
    console.log("Passei aqui......", this.imovelURL+`imovel/${id}`, imovel)
    return this.httpClient.put<any>(this.imovelURL+`imovel/${id}`, imovel, this.httpOptions);
  }

  public deleteImovel(id: number): Observable<any> {
    console.log(this.imovelURL + `imovel/${id}`);
    return this.httpClient.delete<any>(this.imovelURL + `imovel/${id}`, this.httpOptions)
  }

  public getProprietarioImovel(id: Number): Observable<any> {
    return this.httpClient.get<any>(this.imovelURL+ `imovel/prop/${id}`, this.httpOptions)
  }

}
