import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorBoxComponent } from './error-box/error-box.component'
import { SettingComponent } from './setting/setting.component';
import { UserMessageComponent } from './user-message/user-message.component';
import { LandAtGuard } from './no-land-acc.guard';
import { AjaxCallService } from './ajax-call.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  {
    path: 'account', children: [
      { path: '', redirectTo: 'dashboard', pathMatch: "full" },
      { path: 'login', canActivate: [LandAtGuard], component: LoginComponent },
      { path: 'register', canActivate: [LandAtGuard], component: RegisterComponent },
      { path: 'dashboard', canActivate: [LandAtGuard], component: DashboardComponent },
      { path: 'settings', canActivate: [LandAtGuard], component: SettingComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user/:username', component: UserMessageComponent },
  {
    path: '**', component: ErrorBoxComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }