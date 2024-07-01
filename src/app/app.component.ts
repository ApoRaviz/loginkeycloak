import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'map-login';
  constructor(public authService:AuthService) { }
  public async ngOnInit() {
    await this.authService.checkIsLoggedIn();

}
}
