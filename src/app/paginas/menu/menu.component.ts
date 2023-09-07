import { SecurityService } from './../../services/security.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit  {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", route: "home", icon:"home"},
    {name: "Categorias", route: "category", icon:"category"},
    {name: "Imóveis", route: "imovel", icon:"account_balance"},
    {name: "Curso", route: "curso", icon:"school"}
  ]
  auth: any;

  constructor(media: MediaMatcher,
    public securityService: SecurityService,
    protected keycloakService: KeycloakService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {}


  async login(): Promise<void>{
    await this.securityService.kcService.login( {
      redirectUri: window.location.origin
    })
  }

  async logout() {
    this.securityService.kcService.logout(window.location.origin);
  }

  loadProfile(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      if(this.auth.isLoggedIn()){
        this.auth.loadUserProfile()
        .then(data => resolve(data))
        .catch(error => console.log(error))
      } else{
        console.log('user not logged in')
      }
    })
    }
}
