import { Injectable, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnInit {
  public profile? : KeycloakProfile;
  auth: any;

  constructor(public kcService: KeycloakService){
      this.init();
  }

  ngOnInit(): void {}

  async init(){
      this.kcService.keycloakEvents$.subscribe( {
          next: (e) => {
              if(e.type == KeycloakEventType.OnAuthSuccess){
                  this.kcService.loadUserProfile().then(profile=>{
                      this.profile=profile;
                  })
              }
          }
      })
  }

  public hasRoleIn(roles: string[]): boolean{
      let userRoles = this.kcService.getUserRoles();
      for(let role of roles){
          if(userRoles.includes(role)) return true;
      }
      return false;
  }



}
