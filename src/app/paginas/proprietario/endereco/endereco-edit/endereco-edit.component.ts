import { Endereco } from 'src/app/shared/model/endereco';
import { Cep } from './../../../../shared/model/cep';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cidade } from 'src/app/shared/model/cidade';
import { Estado } from 'src/app/shared/model/estado';
import { CepService } from 'src/app/shared/services/cep.service';
import { EnderecoComponent } from '../endereco.component';
import { ServicoGenerico } from 'src/app/shared/services/servicoGenerico';

@Component({
  selector: 'app-endereco-edit',
  templateUrl: './endereco-edit.component.html',
  styleUrls: ['./endereco-edit.component.css']
})
export class EnderecoEditComponent implements OnInit {

  enderForm: FormGroup;
  tpEnders: any;
  cidadesUf: Cidade[];
  estadosUf: Estado[];
  consulta: String;
  resultCep: Cep;
  endereco: Endereco;

  constructor(
    private servicoGenerico: ServicoGenerico,
    private cepService: CepService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.enderForm = this.fb.group({
      cep: [''],
      logradouro: [''],
      complemento: [''],
      bairro: [''],
      tipoEndereco: [''],
      cidade: this.fb.group({
        id: [''],
        nome: [''],
        uf: [''],
      }),
      numero: ['']

    });
  }

  ngOnInit(): void {
    this.servicoGenerico.getEstadosUF().subscribe((response) => {
      this.estadosUf = response;
    });

    this.servicoGenerico.getTipoEndereco().subscribe((response) => {
      this.tpEnders = response;
    })

  }

  compareObjects(o1: any, o2: any): boolean {
    return isEqual(o1, o2);
  }

  ufChange(event: any) {
    this.servicoGenerico
      .getBagCidadeForUF(event.value)
      .subscribe((response) => {
        this.cidadesUf = response;
      });
  }

  consultaCep(){
    if(this.consulta && this.consulta.length > 7){
      this.cepService.pesquisa(this.consulta).subscribe(response =>{
        this.resultCep = response;
        this.servicoGenerico.getBagCidadeForUF(this.resultCep.uf).subscribe(y => {
          this.cidadesUf = y
        });
        this.servicoGenerico.getCidadeForCidadeAndUf(this.resultCep.localidade, this.resultCep.uf).subscribe(x => {
          this.enderForm = this.fb.group({
            cep:[response.cep],
            logradouro: [response.logradouro],
            complemento: [response.complemento],
            bairro: [response.bairro],
            numero: [''],
            tipoEndereco: [''],
            cidade: this.fb.group({
              id: [x.id],
              nome: [x.nome],
              uf: [x.estado.nome],
            }),
          })
        })
      }, error => console.log("Falha."))
    }
  }

  onCancel() {
    this.dialogRef.close(3);

  }

  onSave() {
    this.endereco = this.enderForm.value
    this.endereco.tipoEndereco.toString().toUpperCase();
    this.data.id.proprietario.enderecos.push(this.endereco);
    this.dialogRef.close(1);
  }


}

function isEqual(o1: any, o2: any): boolean {
  return String(o1) === String(o2);
}

