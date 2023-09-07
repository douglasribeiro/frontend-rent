import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MenuComponent } from './paginas/menu/menu.component';
import { HomeComponent } from './paginas/home/home.component';
import { CursoComponent } from './curso/curso.component';

export function kcFactory(kcService: KeycloakService) {
  return () => {
    kcService.init({
      config : {
        realm : "wallet-realm",
        clientId : "wallet-client",
        url : "http://localhost:8082"
      },
      initOptions : {
        onLoad : "check-sso",
        checkLoginIframe : true
      }
    })
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    KeycloakAngularModule
  ],
  providers: [
    { provide : APP_INITIALIZER,  deps : [KeycloakService], useFactory : kcFactory, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
