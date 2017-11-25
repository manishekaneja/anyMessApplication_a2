import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyformComponent } from './myform/myform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ErrorBoxComponent } from './error-box/error-box.component'
import { SettingComponent } from './setting/setting.component';
import { UserMessageComponent } from './user-message/user-message.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: "full" },
  {
    path: 'account', component: MyformComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component:UserMessageComponent },
  {
    path: '**', component: ErrorBoxComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }