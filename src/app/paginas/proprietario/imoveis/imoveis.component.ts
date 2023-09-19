import { ImovelProprietario, ImovelProprietarioId } from './../../../shared/model/imovelProprietario';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Imovel } from 'src/app/shared/model/imovel';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ImovelService } from '../../../shared/services/imovel.service';
import { ListComponent } from './list/list.component';
import { ThemePalette } from '@angular/material/core';
import { Proprietario } from 'src/app/shared/model/proprietario';

@Component({
  selector: 'app-imoveis',
  templateUrl: './imoveis.component.html',
  styleUrls: ['./imoveis.component.css'],
})
export class ImoveisComponent implements OnInit {
  color: ThemePalette = 'primary';
  checked = true;
  disabled = false;
  mvl: Imovel;
  imovelProprietario: ImovelProprietario;

  constructor(
    private service: ImovelService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ip: Imovel[] = [];
  ELEMENT_DATA: Imovel[] = [];

  displayedColumns: string[] = ['id', 'endereco', 'numero', 'servico', '+'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.ViewInit();
  }

  ViewInit() {
    this.service.getProprietarioImovel(this.data.id).subscribe((response) => {
      this.pertence(response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  pertence(obj: any) {
    for (let index = 0; index < obj.length; index++) {
      this.ip.push(obj[index]);
      for(let x = 0; x < obj[index].proprietarios.length; x++){
        if (obj[index].proprietarios[x].id === this.data.id) {
          this.ip[index].pertence = true;
        }
      }
    }
    //console.log(this.ip.sort((a,b) => Number(a.pertence) - Number(b.pertence)))
  }

  change(event: any, element: any) {
    let found = this.ip.find((obj) => {
      return obj.id === element;
    });
    found.pertence = event.checked;
    found.changed = true;
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onSave() {
    for (let x = 0; x < this.ip.length; x++) {
      if (this.ip[x].changed) {
        if(this.ip[x].pertence){
          this.ip[x].proprietario_id = this.data.id;
          this.ip[x].imovel_id = this.ip[x].id

          let modImovel: Imovel = {} as Imovel;
          let modProprietario: Proprietario = {} as Proprietario;
          let modal: ImovelProprietarioId = {} as ImovelProprietarioId;

          modImovel.id = this.ip[x].id;
          modProprietario.id = this.data.id;
          modal.imovel = modImovel;
          modal.proprietario = modProprietario;

          this.ip[x]['proprietarios'].push(modProprietario);

          this.service.putImovel(this.ip[x].imovel_id.toString() , this.ip[x]).subscribe(response => {
            console.log("Sucesso....")
          }, error => console.log("Falha...."))
        }else {
          this.ip[x]['proprietarios'].splice(this.ip[x]['proprietarios'].findIndex(item => item.id == this.data.id),1);
          this.ip[x].proprietario_id = null;
          this.ip[x].imovel_id = null;
          this.service.putImovel(this.ip[x].id.toString() , this.ip[x]).subscribe(response => {
            console.log("Sucesso....")
          }, error => console.log("Falha...."))
        }
      }
    }
    this.dialogRef.close(1);
  }
}
