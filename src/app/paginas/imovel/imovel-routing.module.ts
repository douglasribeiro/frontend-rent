import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ImovelListComponent } from './imovel-list/imovel-list.component';
import { ImovelEditComponent } from './imovel-edit/imovel-edit.component';

const routes: Routes = [
  {path: '', component: ImovelListComponent},
  {path: 'edit', component: ImovelEditComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImovelRoutingModule{}
