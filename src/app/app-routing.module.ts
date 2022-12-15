import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BarberComponent } from './barber/barber.component';
import { UnauthpageComponent } from './unauthpage/unauthpage.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegistrationComponent},
  {path:'barber', component:BarberComponent},
  {path:'401', component:UnauthpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
