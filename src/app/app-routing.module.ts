import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VaccineFormComponent } from './vaccine-form/vaccine-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  {path:'user-dash',component:UserDashboardComponent},
  {path:'register',component:RegistrationComponent},
  {path:'admin-dash',component:AdminDashboardComponent},
  {path:'add',component:VaccineFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
