import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MyformComponent } from './myform/myform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { GetFavPipe } from './get-fav.pipe';
import { MessageListComponent } from './message-list/message-list.component';
import { ErrorBoxComponent } from './error-box/error-box.component';
import { SettingComponent } from './setting/setting.component';


@NgModule({
  declarations: [
    AppComponent,
    MyformComponent,
    DashboardComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    MessageBoxComponent,
    GetFavPipe,
    MessageListComponent,
    ErrorBoxComponent,
    SettingComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
