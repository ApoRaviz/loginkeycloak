import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { KeycloakService } from "keycloak-angular";
import { KeycloakProfile } from "keycloak-js";
import { ReplaySubject } from "rxjs";
import { environment } from "src/environments/environment.development";
// import { environment } from 'src/environments/environment';
interface Options {
  [key: string]: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLoggedIn = false;
  // public userProfile: KeycloakProfile | null = null;
  public userName: string = "";
  public userEmail: string = "";
  public userGroups: string[] = [];
  public userRoles: string[] = [];
  public depCode: string[] = [];
  public userId: string = "";
  public groups: string[] = [];
  // realm: string = environment.keycloakRealm;
  // url: string = environment.keycloakUrl;
  constructor(
    private readonly keycloak: KeycloakService,
    private http: HttpClient
  ) {}

  async checkIsLoggedIn() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    console.log(this.http);
    if (this.isLoggedIn) {
      // this.userProfile = await this.keycloak.loadUserProfile();
      const tokenParsed: Keycloak.KeycloakTokenParsed | undefined =
        this.keycloak.getKeycloakInstance().tokenParsed;
      // console.log(tokenParsed);
      this.userName = tokenParsed?.["name"];
      this.userEmail = tokenParsed?.["email"];
      this.userGroups = tokenParsed?.["groups"];
      this.depCode = tokenParsed?.["dcc_dep_code"];
      this.userId = tokenParsed?.["sub"] ?? "";
      this.groups = tokenParsed?.["groups"];
      this.userRoles = tokenParsed?.["realm_access"]?.roles ?? [];
      console.log(
        this.depCode,
        this.userGroups,
        this.userRoles,
        this.userEmail,
        this.groups
      );

      // const depCodeString
      // await this.loadUserGroups();
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    console.log("logout");
    this.isLoggedIn = false;
    this.keycloak.logout();
  }

  accountConsole() {
    this.keycloak.getKeycloakInstance().accountManagement();
  }

  loginType2(data: any, projectId: string) {
    Object.assign(data, environment.identityConfigs.authParam);
      Object.assign(data, {
        project_id: projectId,
        auth_type: 2,
      });
      const body = this.setURLParams(data).toString();
      const options = {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        ),
      };
      // tslint:disable-next-line: max-line-length
      // .disableApiPrefix()
      // .skipErrorHandler()
      return this.http.post(environment.authUrl + "/connect/token", body, options);
    }
    setURLParams(options: Options) {
      const params = new URLSearchParams();
      // tslint:disable-next-line:forin
      for (const key in options) {
          params.set(key, options[key]);
      }
      return params;
  }
//   getCustomer() {
//     return this.http.auth().get(environment.service.core.identity + '/customer');
//   }
}
