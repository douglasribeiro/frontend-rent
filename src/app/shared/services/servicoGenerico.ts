import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ServicoGenerico {

    urlTipoEdificacao = 'assets/json/TipoEdificacao.json';
    urlTipoImovel = 'assets/json/TipoImovel.json';
    urlTipoServico = 'assets/json/TipoServico.json';
    urlEstadosUF = 'assets/json/EstadosUF.json';
    urlEstCivil = 'assets/json/EstadoCivil.json'
    urlCidades = 'http://localhost:8080/api/generic/cidade';

    constructor(private http: HttpClient) { }

    getTipoEdificacao(): Observable<any>{
      return this.http.get<any>(this.urlTipoEdificacao)
    }

    getTipoImovel(): Observable<any>{
      return this.http.get<any>(this.urlTipoImovel)
    }

    getTipoServico(): Observable<any>{
      return this.http.get<any>(this.urlTipoServico)
    }

    getEstadosUF(): Observable<any> {
      return this.http.get<any>(this.urlEstadosUF)
    }

    getBagCidadeForUF(uf: any): Observable<any> {
      return this.http.get<any>(this.urlCidades + '/'+ uf);
    }

    getEstadoCivil(): Observable<any> {
      return this.http.get<any>(this.urlEstCivil);
    }
  }
