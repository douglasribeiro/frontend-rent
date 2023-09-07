import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private cursoService: CursoService
    //private categoryService: CategoryService,
    //private productService: ProductService
  ){}

  ngOnInit(): void {

  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){


    }else {
        this.dialogRef.close(2);
    }
  }
}


