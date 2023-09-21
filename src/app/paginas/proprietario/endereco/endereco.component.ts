import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Endereco } from "src/app/shared/model/endereco";
import { ProprietarioService } from "src/app/shared/services/proprietario.service";
import { EnderecoEditComponent } from "./endereco-edit/endereco-edit.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProprietarioListComponent } from "../proprietario-list/proprietario-list.component";

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})

export class EnderecoComponent implements OnInit {

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
    this.service.getProrpietarioById(this.data.proprietario.id).subscribe(response => {
      this.ELEMENT_DATA = response.enderecos;
      this.dataSource = new MatTableDataSource<Endereco>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, error => console.log("Erro proprietario por id"))
  }

  /*enderecoToDto(enderecos: any): any{
    for(let x = 0; x < enderecos.length; x++){
      const enderecoDto = new EnderecoDto();
      enderecoDto.bairro = enderecos[x].bairro;
      enderecoDto.cep = enderecos[x].cep;
      if(enderecos[x].cidade){
        enderecoDto.cidade = enderecos[x].cidade.nome;
      } else {
        enderecoDto.cidade = null;
      }
      console.log(enderecos[x].cidade ? enderecos[x].cidade.nome : null);
      this.enderecos.push(enderecos[x])
    }
    console.log(this.enderecos)
  }
*/
  buscar(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(){

    const dialogRef = this.dialog.open(EnderecoEditComponent, {
      width:'850px',
      data: {id:this.data}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

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

    });

  }

  onCancel() {
    this.dialogRef.close(3);

  }
}
