import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Endereco } from 'src/app/shared/model/endereco';
import { ProprietarioService } from 'src/app/shared/services/proprietario.service';
import { EnderecoEditComponent } from './endereco-edit/endereco-edit.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ProprietarioListComponent } from '../proprietario-list/proprietario-list.component';
import { Proprietario } from 'src/app/shared/model/proprietario';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css'],
})
export class EnderecoComponent implements OnInit {
  proprietario: Proprietario;

  constructor(
    private service: ProprietarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProprietarioListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ELEMENT_DATA: Endereco[] = [];

  displayedColumns: string[] = ['cep', 'logradouro', 'numero', 'tipo', 'acoes'];
  dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getProrpietarioById(this.data.proprietario.id).subscribe(
      (response) => {
        this.proprietario = response;
        this.ELEMENT_DATA = response.enderecos;
        this.dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (error) => console.log('Erro proprietario por id')
    );
  }

  buscar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editAddres(endereco: any) {
    const dialogRef = this.dialog.open(EnderecoEditComponent, {
      width: '850px',
      data: {
        id: endereco,
        proprietario: this.proprietario,
        oper: 'alteracao',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.save(result);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EnderecoEditComponent, {
      width: '850px',
      data: { id: this.data, proprietario: this.proprietario, oper: 'inclusao' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.save(result);
      /*
      if(result == 1){
        this.service.putProrpietario(this.data.proprietario.id, this.data.proprietario).subscribe(result => {
          console.log(this.data.proprietario);
          console.log("Endereço Ok.");
          this.ngOnInit();
        }, error => console.log("Erro endereço."))

        //this.ViewInit();
      } else if (result == 2){
        //this.openSnackBar("Erro ao salvar proprietario", "Erro");
        console.log("Endereço Erro.")
      } else {
        //this.openSnackBar("Operação cancelada", "Warning");
        console.log("Endereço ??????")
      }
      */
    });
  }

  private save(result: any) {
    if (result == 1) {
      this.ngOnInit();
      this.openSnackBar("proprietario salvo com sucesso.", "Sucesso");
      //this.ViewInit();
    } else if (result == 2) {
      this.openSnackBar("Erro ao salvar proprietario", "Erro");
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
