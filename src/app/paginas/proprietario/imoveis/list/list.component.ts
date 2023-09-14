import { Proprietario } from 'src/app/shared/model/proprietario';
import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ImovelService } from 'src/app/shared/services/imovel.service';
import { Imovel } from 'src/app/shared/model/imovel';
import { ImoveisComponent } from '../imoveis.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  color: ThemePalette = 'primary';
  checked = true;
  disabled = false;

  ip: Imovel[] = [];

  constructor(private service: ImovelService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ImoveisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  ELEMENT_DATA: Imovel[] = [];

  displayedColumns: string[] = ['id', 'endereco', 'numero', 'servico', '+'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ViewInit();
  }

  ViewInit() {
    this.service.getListImovel().subscribe(response => {
      this.pertence(response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
    this.dataSource.paginator = this.paginator;
  }

  buscar(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pertence(obj: any) {
    for (let index = 0; index < obj.length ; index++) {
      this.ip.push(obj[index])
      for (let x = 0; x < obj[index].proprietarios.length; x++){
        if(obj[index].proprietarios[x].id == this.data){
          this.ip[index].pertence = true;
        }
      }
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  onSave(){

  }

  change(event: any, element: any){
   console.log(event.checked +" "+element+ " "+ this.data )
   let found = this.ip.find((obj) => {
    return obj.id === element
   })
   console.log(found)
   //console.log(found.proprietarios[0].id);

  }
}
