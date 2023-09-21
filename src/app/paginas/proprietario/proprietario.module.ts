import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietarioListComponent } from './proprietario-list/proprietario-list.component';
import { ProprietarioEditComponent } from './proprietario-edit/proprietario-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { ProprietarioRoutingModule } from './proprietario-routing.module';
import { EnderecoComponent } from './endereco/endereco.component';
import { ImoveisComponent } from './imoveis/imoveis.component';
import { ListComponent } from './imoveis/list/list.component';
import { EnderecoEditComponent } from './endereco/endereco-edit/endereco-edit.component';



@NgModule({
  declarations: [
    ProprietarioListComponent,
    ProprietarioEditComponent,
    EnderecoComponent,
    ImoveisComponent,
    ListComponent,
    EnderecoEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ProprietarioRoutingModule
  ]
})
export class ProprietarioModule { }
