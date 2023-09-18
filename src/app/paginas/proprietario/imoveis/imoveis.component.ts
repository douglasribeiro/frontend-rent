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
      console.log(response[0]);
      this.pertence(response);
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
    console.log("Antes......", this.ip)
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
      if (obj[index].proprietario_id) {
        this.ip[index].pertence = true;
      }
    }
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
    debugger
    for (let x = 0; x < this.ip.length; x++) {
      if (this.ip[x].changed) {
        console.log(this.data.id)
        if(this.ip[x].pertence){
          console.log("Inclusão....", this.ip[x]);
          // persons.splice(persons.findIndex(item => item.firstName === 'William'),1);
        }else {
          this.ip.splice(this.ip.findIndex(item => item.proprietario_id === this.ip[x].proprietario_id
                                          && item.imovel_id === this.ip[x].imovel_id),1)
          console.log("Depois......", this.ip)
        }
        
      }
    }
    this.dialogRef.close(1);
  }
}
