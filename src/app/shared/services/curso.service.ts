import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  cursoURL: string = "http://localhost:8080/imovel"

  httpOptions = { headers: new HttpHeaders({'Content-Type' : 'application/json', 'ativo': 'true'})};

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<any> {
    console.log("URL ", this.cursoURL)
    return this.httpClient.get(this.cursoURL + '/client-ativo', this.httpOptions);
  }

  public detail(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(this.cursoURL + `detail/${id}`, this.httpOptions);
  }

  public create(curso: Curso): Observable<any> {
    return this.httpClient.post<any>(this.cursoURL , curso, this.httpOptions);
  }

  public update(id: number, curso: Curso): Observable<any> {
    return this.httpClient.put<any>(this.cursoURL + `update/${id}`, curso, this.httpOptions);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.cursoURL + `delete/${id}`, this.httpOptions);
  }
}
