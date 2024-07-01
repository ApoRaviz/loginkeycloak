import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { WorkComponent } from './work/work.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { roles: ['user'] }
  },
  {
    path: 'work',
    component: WorkComponent,
    canActivate: [AuthGuard], // ใช้ AuthGuard เช่นเดียวกับหน้า home
    data: { roles: ['user'] } // ในที่นี้กำหนดให้เฉพาะผู้ใช้ที่ล็อกอินแล้วเท่านั้นเข้าถึงได้
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
