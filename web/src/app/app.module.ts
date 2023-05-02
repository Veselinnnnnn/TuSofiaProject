import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HeaderComponent } from './components/common/header/header.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastsComponent } from './components/common/toasts/toasts.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule, DatePipe } from '@angular/common';

import { FlatpickrModule } from 'angularx-flatpickr';
import { DailyScheduleComponent } from './components/pages/daily-schedule/daily-schedule.component';
import { CreateAddressComponent } from './components/forms/create-edit-view-address/create-edit-view-address.component';
import { CreateHallComponent } from './components/forms/create-edit-view-hall/create-edit-view-hall.component';
import { AddressComponent } from './components/pages/address/address.component';
import { DeleteComponent } from './components/common/delete/delete.component';
import { HallsComponent } from './components/pages/halls/halls.component';
import { SpeakerComponent } from './components/pages/speaker/speaker.component';
import { CreateEditViewSpeakerComponent } from './components/forms/create-edit-view-speaker/create-edit-view-speaker.component';
import { CreateEditViewSessionComponent } from './components/forms/create-edit-view-session/create-edit-session.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewSessionComponent } from './components/forms/create-edit-view-session/view-session/view-session.component';
import { AddPhotoSpeakerComponent } from './components/forms/create-edit-view-speaker/add-photo-speaker/add-photo-speaker.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ErrorComponent } from './components/common/error/error.component';
import { AccountSettingsComponent } from './components/pages/account-settings/account-settings.component';
import { JwtService } from './services/jwt.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignInComponent,
    SignUpComponent,
    ToastsComponent,
    DailyScheduleComponent,
    CreateAddressComponent,
    CreateHallComponent,
    AddressComponent,
    DeleteComponent,
    HallsComponent,
    SpeakerComponent,
    CreateEditViewSpeakerComponent,
    CreateEditViewSessionComponent,
    ViewSessionComponent,
    AddPhotoSpeakerComponent,
    ErrorComponent,
    AccountSettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    HttpClientModule,
    CommonModule,
    NgbModule,
    NgxPaginationModule,
    ImageCropperModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [DatePipe, JwtService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
