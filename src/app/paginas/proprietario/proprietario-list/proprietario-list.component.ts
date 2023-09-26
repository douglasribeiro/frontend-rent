import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Proprietario } from 'src/app/shared/model/proprietario';
import { ProprietarioService } from '../../../shared/services/proprietario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { ProprietarioEditComponent } from '../proprietario-edit/proprietario-edit.component';
import { EnderecoComponent } from '../endereco/endereco.component';
import { ImoveisComponent } from '../imoveis/imoveis.component';

@Component({
  selector: 'app-proprietario-list',
  templateUrl: './proprietario-list.component.html',
  styleUrls: ['./proprietario-list.component.css']
})
export class ProprietarioListComponent {

  constructor(private service: ProprietarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar){}

  ELEMENT_DATA: Proprietario[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', "acoes"];
  dataSource = new MatTableDataSource<Proprietario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    this.ViewInit();
  }

  ViewInit() {
    this.service.getListProrpietario().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Proprietario>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, error => {
      if(error.status == 503) {
        this.openSnackBar("Serviço de proprietarios naõ esta no ar, tente novamente mais tarde.", "Error");
      }
    })
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width:'450px',
      data: {module: "exclusão de proprietarios"}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.service.deleteProrpietario(id).subscribe(() => {
          this.openSnackBar("Proprietario Excluido", "Sucesso");
          this.ViewInit();
        }, error => {
          this.openSnackBar("Proprietario não pode ser excluido", "Warning");
        });
      } else if (result == 2){
        this.openSnackBar("Exclusão de proprietario cancelada", "Warning");
      }

    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  ver(){
    this.openSnackBar("Proprietario Excluido", "Sucesso");
  }

  openDialog(){

    const dialogRef = this.dialog.open(ProprietarioEditComponent, {
      width:'850px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Proprietario salvo", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar proprietario", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });

  }

  edit(id: number){

    const dialogRef = this.dialog.open(ProprietarioEditComponent, {
      width:'950px',
      data: id
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Proprietario salvo", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar proprietario", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });

  }

  dialogEndereco(proprietario: any, nomeProrpietario: any){
    //console.log("Prrrrietario. " + proprietario )
    const dialogRef = this.dialog.open(EnderecoComponent, {
      width:'80%',
      height: '90%',
      data: {proprietario: proprietario, nome: nomeProrpietario}
    });

  }

  dialogImoveis(listImoveis: any, id: any, nomeProrpietario: any){

    const dialogRef = this.dialog.open(ImoveisComponent, {
      width:'80%',
      height: '90%',
      data: {list:listImoveis, id:id,  nome: nomeProrpietario}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Imovel salvo", "Sucesso");
        //console.log(this.ELEMENT_DATA)
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar imovel", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });

  }

  buscar(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
