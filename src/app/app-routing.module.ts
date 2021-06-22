import { AdminVerificationComponent } from './components/admin-verification/admin-verification.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { SendmoneyComponent } from './components/payment/sendmoney/sendmoney.component';
import { TillnumberComponent } from './components/payment/tillnumber/tillnumber.component';
import { PaybillComponent } from './components/payment/paybill/paybill.component';
import { PasswordComponent } from './components/password/password.component'
import { LandingComponent } from './components/landing/landing.component';

import { ActivationComponent } from './components/activation/activation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component'
import { PaymentComponent } from './components/payment/payment.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminVerificationdetailsComponent } from './components/admin-verificationdetails/admin-verificationdetails.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'registration', component: RegistrationComponent},
  { path: 'activation/:id', component: ActivationComponent},
  { path: 'home', component: LandingComponent},
  { path: 'payment', component: PaymentComponent, 
      children: [
        { path: 'sendmoney', component: SendmoneyComponent},
        { path: 'paybill', component: PaybillComponent},
        { path: 'till', component: TillnumberComponent},
      ]
      },
  { path:'password', component: PasswordComponent},
  { path:'adminregister', component: AdminRegistrationComponent},
  { path:'adminlogin', component: AdminLoginComponent},
  { path:'adminverify', component: AdminVerificationComponent}, 
  { path: 'userdetails/:phone_number', component: AdminVerificationdetailsComponent},
  { path: 'category-details', component:CategoryDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ RegistrationComponent, LoginComponent , ActivationComponent, LandingComponent, PaymentComponent , PaybillComponent , TillnumberComponent, SendmoneyComponent, PasswordComponent , AdminLoginComponent, AdminRegistrationComponent , AdminVerificationComponent, 
AdminVerificationComponent]