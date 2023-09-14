import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ProprietarioListComponent } from './proprietario-list/proprietario-list.component';
import { ProprietarioEditComponent } from './proprietario-edit/proprietario-edit.component';

const routes: Routes = [
  {path: '', component: ProprietarioListComponent},
  {path: 'edit', component: ProprietarioEditComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietarioRoutingModule{}
