import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './paginas/menu/menu.component';
import { HomeComponent } from './paginas/home/home.component';
import { CursoComponent } from './curso/curso.component';
import { AuthGuard } from './guards/sercurity.guard';

const routes: Routes = [
  {path: '', component: MenuComponent,
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'imovel', loadChildren: () => import('./paginas/imovel/imovel.module').then(m => m.ImovelModule), canActivate: [AuthGuard], data: {roles: ['USER']}},
      {path: 'proprietario', loadChildren: () => import('./paginas/proprietario/proprietario.module').then(m => m.ProprietarioModule), canActivate: [AuthGuard], data: {roles: ['USER']}},
      {path: 'curso', component: CursoComponent, canActivate : [AuthGuard], data : { roles : ['USER']}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
