import { Component, OnInit, ViewChild } from '@angular/core';
import { ImovelService } from '../imovel.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Imovel } from 'src/app/shared/model/imovel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';
import { ImovelEditComponent } from '../imovel-edit/imovel-edit.component';

@Component({
  selector: 'app-imovel-list',
  templateUrl: './imovel-list.component.html',
  styleUrls: ['./imovel-list.component.css']
})
export class ImovelListComponent implements    OnInit {

  constructor(private service: ImovelService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar){}

  ELEMENT_DATA: Imovel[] = [];

  displayedColumns: string[] = ['id', 'endereco', 'numero', 'tipo', 'edificacao', 'servico', 'quartos', 'suites', 'banheiros', 'vagas', 'acoes'];
  dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    this.ViewInit();
  }

  ViewInit() {
    this.service.getListImovel().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Imovel>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
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
      data: {id:id, module: "curso"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result == 1){
        this.openSnackBar("Imovel Excluido", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao excluir imovel", "Erro");
      }

    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  ver(){
    this.openSnackBar("Imovel Excluido", "Sucesso");
  }

  openDialog(){
    /*
    const dialogRef = this.dialog.open(ImovelEditComponent, {
      width:'850px',
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Imovel salvo", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar imovel", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });
    */
  }

  edit(id: number){

    const dialogRef = this.dialog.open(ImovelEditComponent, {
      width:'950px',
      data: id
    });
/*
    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Imovel salvo", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar imovel", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });
    */
  }

  dialogProprietario(idProprietario: any){
    /*
    const dialogRef = this.dialog.open(ProprietarioListComponent, {
      width:'1250px',
      height: '450px',
      data: {id:idProprietario}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Imovel salvo", "Sucesso");
        this.ViewInit();
      } else if (result == 2){
        this.openSnackBar("Erro ao salvar imovel", "Erro");
      } else {
        this.openSnackBar("Operação cancelada", "Warning");
      }

    });
    */
  }

  buscar(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
