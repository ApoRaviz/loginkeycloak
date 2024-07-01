import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "map-login";
  data = {
    userName: "13019",
    password: "Aa123456789aA",
  };
  projectId = "f1354fef-6407-423c-b6e0-58a3f0f08ad0";
  login: boolean = false;
  constructor(public authService: AuthService) {}
  public async ngOnInit() {
    await this.authService.checkIsLoggedIn();
  }
  Onlogin() {
    console.log('login yamato')
    this.authService.loginType2(this.data, this.projectId).subscribe(
      async (rs: any) => {
        console.log(rs)
        this.login = true;
      },
    );
  }
}
