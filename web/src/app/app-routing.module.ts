import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAddressComponent } from './components/forms/create-edit-view-address/create-edit-view-address.component';
import { CreateEditViewSessionComponent } from './components/forms/create-edit-view-session/create-edit-session.component';
import { AccountSettingsComponent } from './components/pages/account-settings/account-settings.component';
import { AddressComponent } from './components/pages/address/address.component';
import { DailyScheduleComponent } from './components/pages/daily-schedule/daily-schedule.component';
import { HallsComponent } from './components/pages/halls/halls.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { SpeakerComponent } from './components/pages/speaker/speaker.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signIn', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent },
  { path: 'daySchedule', component:DailyScheduleComponent},
  { path: 'createSession', component:CreateEditViewSessionComponent},
  { path: 'createAddress', component:CreateAddressComponent},
  { path: 'addresses', component:AddressComponent},
  { path: 'halls', component:HallsComponent},
  { path: 'speakers', component: SpeakerComponent },
  { path: 'account-settings', component: AccountSettingsComponent},
  { path: '**', component: HomeComponent, redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
