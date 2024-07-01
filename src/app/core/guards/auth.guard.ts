import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this.keycloakService.isLoggedIn())
        const authenticated = await this.keycloakService.isLoggedIn();
        if (authenticated) {
          console.log('Authenticated')
          resolve(true);
        } else {
          console.log('Authentication pls')
          await this.keycloakService.login();
          resolve(true);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
