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
import { ProprietarioService } from 'src/app/shared/services/proprietario.service';

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
    private service: ProprietarioService,
    private cepService: CepService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EnderecoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
      for(let i = 0; i < data.proprietario.enderecos.length; i++){
        if(data.proprietario.enderecos[i].id == data.id){
          this.endereco = data.proprietario.enderecos[i];
          break;
        }
      }
      this.consulta = data.oper == 'inclusao' ? '' : this.endereco.cep.replace(/\D/gim, '');
      this.enderForm = this.fb.group({
        id: [ data.oper == 'inclusao' ? '' : this.endereco.id],
        cep: [ data.oper == 'inclusao' ? '' : this.endereco.cep.replace(/\D/gim, '')],
        logradouro: [data.oper == 'inclusao' ? '' : this.endereco.logradouro],
        complemento: [data.oper == 'inclusao' ? '' : this.endereco.complemento],
        bairro: [data.oper == 'inclusao' ? '' : this.endereco.bairro],
        tipoEndereco: [data.oper == 'inclusao' ? '' : this.endereco.tipoEndereco],
        cidade: this.fb.group({
          id: [data.oper == 'inclusao' ? '' : this.endereco.cidade.id],
          nome: [data.oper == 'inclusao' ? '' : this.endereco.cidade.nome],
          uf: [data.oper == 'inclusao' ? '' : this.endereco.cidade.estado.nome],
        }),
        numero: [data.oper == 'inclusao' ? '' : this.endereco.numero]

      });
      if(data.oper == 'alteracao'){
        this.consultaCep()
      }
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
    if(this.consulta && this.consulta.length > 7) { //&& this.data.oper == 'inclusao'){
      this.cepService.pesquisa(this.consulta).subscribe(response =>{
        this.resultCep = response;
        this.servicoGenerico.getBagCidadeForUF(this.resultCep.uf).subscribe(y => {
          this.cidadesUf = y
        });


        this.servicoGenerico.getCidadeForCidadeAndUf(this.resultCep.localidade, this.resultCep.uf).subscribe(x => {
          this.enderForm = this.fb.group({
            id: [response.id],
            cep:[response.cep],
            logradouro: [response.logradouro],
            complemento: [this.data.oper == 'inclusao' ? '' : this.endereco.complemento],
            bairro: [response.bairro],
            numero: [this.data.oper == 'inclusao' ? '' : this.endereco.numero],
            tipoEndereco: [this.data.oper == 'inclusao' ? '' : this.endereco.tipoEndereco],
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
    if(this.data.oper == 'inclusao'){
      this.data.id.proprietario.enderecos.push(this.endereco);
      this.service.putProrpietario(this.data.proprietario.id, this.data.id.proprietario).subscribe(result => {
        this.ngOnInit();
      }, error => console.log("Erro endereço."))
    }else {
      for(let i = 0; i < this.data.proprietario.enderecos.length; i++){
        if(this.data.proprietario.enderecos[i].id == this.data.id){
          this.data.proprietario.enderecos[i] = this.enderForm.value;
          this.data.proprietario.enderecos[i].id = this.data.id;
          //this.data.proprietario.enderecos[i].numero = this.data.id;
          break;
        }
      }
      this.service.putProrpietario(this.data.proprietario.id, this.data.proprietario).subscribe(result => {
        this.ngOnInit();
      }, error => console.log("Erro endereço."))


    }
    this.dialogRef.close(1);
  }


}

function isEqual(o1: any, o2: any): boolean {
  return String(o1) === String(o2);
}

function apenasNumeros(string)
{
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}
