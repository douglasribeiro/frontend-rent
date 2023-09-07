import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImovelListComponent } from './imovel-list/imovel-list.component';
import { ImovelEditComponent } from './imovel-edit/imovel-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';
import { ImovelRoutingModule } from './imovel-routing.module';



@NgModule({
  declarations: [
    ImovelListComponent,
    ImovelEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    ImovelRoutingModule
  ]
})
export class ImovelModule { }
