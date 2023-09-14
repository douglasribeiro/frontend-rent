import { ServicoGenerico } from './../../../shared/services/servicoGenerico';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Cidade } from 'src/app/shared/model/cidade';
import { Estado } from 'src/app/shared/model/estado';
import { Imovel } from 'src/app/shared/model/imovel';
import { ImovelService } from '../../../shared/services/imovel.service';

@Component({
  selector: 'app-imovel-edit',
  templateUrl: './imovel-edit.component.html',
  styleUrls: ['./imovel-edit.component.css']
})
export class ImovelEditComponent implements OnInit {

  productForm: FormGroup;
  imovel: Imovel;
  estadoFormulario: string = "";
  chkCondominio: boolean = false;
  condomi: Number;
  tiposEdv: any;
  tiposSrv: any;
  tiposImv: any;
  selectTI: any;
  selectTE: any;
  selectTS: any;
  imovelId: any;
  cidadesUf: Cidade[];
  estadosUf: Estado[];
  imovelLocalizado: Imovel;

  constructor(
    private servicoGenerico: ServicoGenerico,
    private fb: FormBuilder,
    private service: ImovelService,
    public dialog: MatDialog,
    public dialogP: MatDialog,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ImovelEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.servicoGenerico.getEstadosUF().subscribe(response =>{
      this.estadosUf = response;
    })
    this.servicoGenerico.getTipoImovel().subscribe(response => {
      this.tiposImv = response;
    })

    this.servicoGenerico.getTipoEdificacao().subscribe(response => {
      this.tiposEdv = response

    })
    this.servicoGenerico.getTipoServico().subscribe(response => {
      this.tiposSrv = response;
    })

/*
    this.estadoFormulario = "Incluir"
    this.productForm = this.fb.group({
      proprietarioMaster: ['Novo', Validators.required],
      matricula: ['123', Validators.required],
      complementoImovel: ['compl imov', Validators.required],
      condominio: ['0', Validators.required],
      tipoImovel: ['0', Validators.required],
      tipoEdificacao: ['0', Validators.required],
      tipoServico: ['0', Validators.required],
      areaTotal: ['125', Validators.required],
      areaConstruida: ['280', Validators.required],
      banheiros: ['2', Validators.required],
      quartos: ['2', Validators.required],
      suites: ['1', Validators.required],
      comodos: ['5', Validators.required],
      vagas: ['2', Validators.required],
      observacao: ['Sem obs', Validators.required],
      cep: ['148000'],
      logradouro: ['Rua esperança'],
      complemento: ['compl ender '],
      numero: ['100'],
      bairro: ['Centro'],
      ibge: ['12356'],
      cidade: this.fb.group({
        id: [''],
        nome: [''],
        uf: [''],
        ibge:[''],
      }),
      proprietarios: [],
      photos: []
    })
*/

    if (data != null) {
      this.service.getImovelById(data).subscribe(response => {
        this.imovelLocalizado = response;
        this.productForm = this.fb.group({
          proprietarioMaster: [response.proprietarioMaster, Validators.required],
          registro: [response.registro, Validators.required],
          complementoImovel: [response.complementoImovel, Validators.required],
          condominio: [response.condominio],
          tipoImovel: [response.tipoImovel, Validators.required],
          tipoEdificacao: [response.tipoEdificacao, Validators.required],
          tipoServico: [response.tipoServico, Validators.required],
          areaTotal: [response.areaTotal, Validators.required],
          areaConstruida: [response.areaContruida, Validators.required],
          banheiros: [response.banheiros, Validators.required],
          quartos: [response.quartos, Validators.required],
          suites: [response.suites, Validators.required],
          comodos: [response.comodos, Validators.required],
          vagas: [response.vagas, Validators.required],
          cep: [response.cep],
          logradouro: [response.logradouro],
          complemento: [response.complementoImovel],
          numero: [response.numero],
          bairro: [response.bairro],
          cidade: this.fb.group({
              id: [response.cidade.id],
              nome: [response.cidade.nome],
              uf: [response.cidade.estado.nome],
            }),
          //photos: [response.photos, Validators.required],
          //proprietarios: [response.proprietarios, Validators.required],
        });
        this.selectTI = response.tipoImovel;
        this.selectTE = response.tipoEdificacao;
        this.selectTS = response.tipoServico;
        this.condomi = Number(response.condominio);
        this.imovelId = response.id;
        this.estadoFormulario = "Atualizar";
        if(this.imovelLocalizado.cidade.id){
          console.log(this.imovelLocalizado.cidade.estado.id);
          this.servicoGenerico.getBagCidadeForUF(this.imovelLocalizado.cidade.estado.id).subscribe(response => {
            this.cidadesUf = response;
          })
        }
      }
      )
    } else {
      //console.log("Novo Imóvel")
      this.productForm = this.fb.group({
        proprietarioMaster: ["", Validators.required],
        registro: ["", Validators.required],
        complementoImovel: ["", Validators.required],
        condominio: [""],
        tipoImovel: ["", Validators.required],
        tipoEdificacao: ["", Validators.required],
        tipoServico: ["", Validators.required],
        areaTotal: ["", Validators.required],
        areaConstruida: ["", Validators.required],
        banheiros: ["", Validators.required],
        quartos: ["", Validators.required],
        suites: ["", Validators.required],
        comodos: ["", Validators.required],
        vagas: ["", Validators.required],
        cep: [""],
        logradouro: [""],
        complemento: [""],
        numero: [""],
        bairro: [""],
        cidade: this.fb.group({
            id: [""],
            nome: [""],
            uf: [""],
          }),
        //photos: [response.photos, Validators.required],
        //proprietarios: [response.proprietarios, Validators.required],
      });
      this.selectTI = "";
      this.selectTE = "";
      this.selectTS = "";
      this.condomi = Number("0");
      this.imovelId = "";
      this.estadoFormulario = "Novo";
      //if(this.imovelLocalizado.cidade.id){
      //  this.servicoGenerico.getBagCidadeForUF(this.imovelLocalizado.cidade.estado.id).subscribe(response => {
      //    this.cidadesUf = response;
      //  })

    }
  }

  ngOnInit(): void {

  }

  openDialogEndereco() {
    var dialogEnd: any;
    if (this.estadoFormulario != "Incluir") {
      //dialogEnd = this.dialog.open(ImovelEnderecoComponent, {
      //  width: '650px',
      //  data: { form: this.productForm.value }
      //});
    } else {
      //dialogEnd = this.dialog.open(ImovelEnderecoComponent, {
      //  width: '650px',
      //  data: {form: this.productForm.value}
      //});
    }
    dialogEnd.afterClosed().subscribe((result: any) => {
      if (result == 2) {
        this.openSnackBar("Edição de Endereço cancelada", "Warning");
      } else {
        this.productForm = result;
      }

    });
  }

  openDialogProprietario() {
    //const dialogProp = this.dialogP.open(ImovelProprietarioComponent, {
    //  width: '850px',
    //});

    //dialogProp.afterClosed().subscribe((result: any) => {

     // if (result == 1) {
     //   this.openSnackBar("Produto salvo", "Sucesso");
        //this.ngAfterViewInit;
     // } else if (result == 2) {
     //   this.openSnackBar("Erro ao salvar produto", "Erro");
     // }

    //}
    //);
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onSave(formulario: any) {
    if (this.estadoFormulario == "Novo") {
      this.service.postImovel(this.productForm.value).subscribe(response => {
        console.log("Salvar Imovel ", response)
      }, error => {
        console.log("Error salvar imovel", error)
      })
    } else {
      console.log("onsave", this.imovelId);
      this.service.putImovel(this.imovelId, this.productForm.value).subscribe(response => {
        console.log("Salvar Imovel ", response)
      }, error => {
        console.log("Error salvar imovel", error)
      })
    }

    this.dialogRef.close(1);
  }

  ufChange(event: any) {
    this.servicoGenerico.getBagCidadeForUF(event.value).subscribe(response => {
      this.cidadesUf = response;
    })
  }

  compareObjects(o1: any, o2: any): boolean {
    return isEqual(o1, o2);
  }
}

function isEqual(o1: any, o2: any): boolean {
  return String(o1) === String(o2);
}
