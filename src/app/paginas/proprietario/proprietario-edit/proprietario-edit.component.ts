import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proprietario } from 'src/app/shared/model/proprietario';
import { ServicoGenerico } from 'src/app/shared/services/servicoGenerico';
import { ProprietarioService } from '../../../shared/services/proprietario.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-proprietario-edit',
  templateUrl: './proprietario-edit.component.html',
  styleUrls: ['./proprietario-edit.component.css']
})
export class ProprietarioEditComponent {

  productForm: FormGroup;
  proprietario: Proprietario;
  proprietarioId: any;
  estadoFormulario: string = "";
  proprietarioLocalizado: Proprietario;
  tpEstCivil: any;
  selectEstCivil: any;
  id: any;

  constructor(
    private servicoGenerico: ServicoGenerico,
    private fb: FormBuilder,
    private service: ProprietarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProprietarioEditComponent>,
    private _adapter: DateAdapter<any>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

    this._locale = 'fr';
    this._adapter.setLocale(this._locale);

    this.servicoGenerico.getEstadoCivil().subscribe(response =>{
      this.tpEstCivil = response;
    })
    if (data != null) {
      this.service.getProrpietarioById(data).subscribe(response => {
        this.proprietarioLocalizado = response;
        this.productForm = this.fb.group({
          nome: [response.nome, Validators.required],
          cpf: [response.cpf, Validators.required],
          ident: [response.ident],
          dtNasc: [response.dtNasc],
          email: [response.email],
          estCivil: [response.estCivil],
          naturalidade: [response.naturalidade],
          nacionalidade: [response.nacionalidade],
          conjuge: [response.conjuge],
          cpfConjuge: [response.cpfConjuge],
          dtnConjuge: [response.dtnConjuge],
          endereco: [response.cliente],
          imovel: [response.imovel],
          id: [response.id]
        });
        this.selectEstCivil = response.estCivil;
        this.estadoFormulario = "Atualizar";
        this.proprietarioId = response.id;
      })
    } else {
      //console.log("Novo Imóvel")
      this.productForm = this.fb.group({
        nome: ["", Validators.required],
        cpf: ["", Validators.required],
        ident: [""],
        dtNasc: [""],
        email: [""],
        estCivil: [""],
        naturalidade: [""],
        nacionalidade: [""],
        conjuge: [""],
        cpfConjuge: [""],
        dtnConjuge: [""],
        endereco: [""],
        imovel: [""],
        id: [""]
      });
      this.estadoFormulario = "Novo";
    }
  }

  onSave(formulario: any){
    if (this.estadoFormulario == "Novo") {
      this.service.postProrpietario(this.productForm.value).subscribe(response => {
        console.log("Salvar Proprietario ", response)
      }, error => {
        console.log("Error salvar Proprietario", error)
      })
    } else {
      this.service.putProrpietario(this.proprietarioId, this.productForm.value).subscribe(response => {
        console.log("Salvar Proprietario ", response)
      }, error => {
        console.log("Error salvar Proprietario", error)
      })
    }

    this.dialogRef.close(1);
  }

  onCancel(){
    this.dialogRef.close(3);
  }

}
