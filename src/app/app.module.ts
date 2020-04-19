import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import { UserMessageComponent } from './user-message/user-message.component';
import { LandAtGuard } from './no-land-acc.guard';
import { AjaxCallService } from './ajax-call.service';
import { EqualCheckDirective } from './equal-check.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [
    AppComponent,

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
    UserMessageComponent,
    EqualCheckDirective
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [AjaxCallService, LandAtGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
