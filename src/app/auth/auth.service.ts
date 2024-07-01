
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ReplaySubject } from 'rxjs';
// import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public isLoggedIn = false;
    // public userProfile: KeycloakProfile | null = null;
    public userName: string = '';
    public userEmail: string = '';
    public userGroups: string[] = [];
    public userRoles: string[] = [];
    public depCode: string[] = [];
    public userId: string = '';
    public groups: string[] = [];
    // realm: string = environment.keycloakRealm;
    // url: string = environment.keycloakUrl;

    constructor(private readonly keycloak: KeycloakService) { }

    async checkIsLoggedIn() {
        this.isLoggedIn = await this.keycloak.isLoggedIn();

        if (this.isLoggedIn) {
            // this.userProfile = await this.keycloak.loadUserProfile();
            const tokenParsed: Keycloak.KeycloakTokenParsed | undefined = this.keycloak.getKeycloakInstance().tokenParsed;
            // console.log(tokenParsed);
            this.userName = tokenParsed?.['name'];
            this.userEmail = tokenParsed?.['email'];
            this.userGroups = tokenParsed?.['groups'];
            this.depCode = tokenParsed?.['dcc_dep_code'];
            this.userId = tokenParsed?.['sub'] ?? '';
            this.groups = tokenParsed?.['groups'];
            this.userRoles = tokenParsed?.['realm_access']?.roles ?? [];
            console.log(this.depCode,this.userGroups, this.userRoles,this.userEmail,this.groups);

            // const depCodeString
            // await this.loadUserGroups();
        }
    }

    login() {
        this.keycloak.login();
    }

    logout() {
      console.log('logout');
      this.isLoggedIn = false;
        this.keycloak.logout();
    }

    accountConsole() {
        this.keycloak.getKeycloakInstance().accountManagement();
    }



}
