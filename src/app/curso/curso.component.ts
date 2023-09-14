import { Component, OnInit } from '@angular/core';
import { CursoService } from '../shared/services/curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit{

  constructor(private cursoService: CursoService){}

  ngOnInit(): void {
    console.log("Curso inicio")
    this.cursoService.list().subscribe(response => console.log(response));
  }

}
