import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Imovel } from 'src/app/shared/model/imovel';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImovelService } from '../../../shared/services/imovel.service';
import { ListComponent } from './list/list.component';
import { ThemePalette } from '@angular/material/core';
import { Proprietario } from 'src/app/shared/model/proprietario';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css']
})
export class ImoveisComponent implements OnInit {

  color: ThemePalette = 'primary';
  checked = true;
  disabled = false;
  //ip: Imovel[] = [];
  mvl: Imovel;

  constructor(private service: ImovelService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

  backup: Imovel[] = [];
  ip: Imovel[] = [];
  ELEMENT_DATA: Imovel[] = [];

  displayedColumns: string[] = ['id', 'endereco', 'numero', 'servico', '+'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getListImovel().subscribe(response => {
      this.backup = response;
    })
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



  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  pertence(obj: any) {
    console.log(obj);
    console.log(this.data)
    for (let index = 0; index < obj.length ; index++) {
      this.ip.push(obj[index])
      for (let x = 0; x < obj[index].proprietarios.length; x++){
        if(obj[index].proprietarios[x].id == this.data.id){
          this.ip[index].pertence = true;
        }
      }
    }
  }

  change(event: any, element: any){
    let found = this.ip.find((obj) => {
     return obj.id === element
    })
    //console.log(this.data)
    if(event.checked){
      found['proprietarios'].push(this.data.list)
    }
    else
    {
      found['proprietarios'].splice(found['proprietarios'].findIndex(item => item.id === this.data.id))
    }
    //console.log(found);

   }

  onCancel(){
    this.dialogRef.close(3);
  }

  onSave(){
    console.log(this.ip)
    console.log("Backup ", this.backup)
    for(let x = 0; x < this.ip.length; x++){
      //console.log(this.ip[x]['proprietarios'].length + "/" + this.backup[x]['proprietarios'].length);
      if(this.ip[x]['proprietarios'].length != this.backup[x]['proprietarios'].length){
        console.log(this.ip[x].id);
        this.service.putImovel(this.ip[x].id, this.ip[x]).subscribe(response => {
          console.log("Response. ",response)
        })

        /*
        this.service.putImovel(this.imovelId, this.productForm.value).subscribe(response => {
        console.log("Salvar Imovel ", response)
      }, error => {
        console.log("Error salvar imovel", error)
      })
        */

      }
    }
    //this.service.putImovel()
    this.dialogRef.close(1);
  }
}
