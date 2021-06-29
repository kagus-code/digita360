
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule , routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { LandingComponent } from './components/landing/landing.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { InsightsComponent } from './components/insights/insights.component';
import { ActivationComponent } from './components/activation/activation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { PaybillComponent } from './components/payment/paybill/paybill.component';
import { TillnumberComponent } from './components/payment/tillnumber/tillnumber.component';
import { SendmoneyComponent } from './components/payment/sendmoney/sendmoney.component';
import { PasswordComponent } from './components/password/password.component';
import { AdminRegistrationComponent } from './components/admin-registration/admin-registration.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminVerificationComponent } from './components/admin-verification/admin-verification.component';
import { AdminVerificationdetailsComponent } from './components/admin-verificationdetails/admin-verificationdetails.component';
import { AdminnavbarComponent } from './components/adminnavbar/adminnavbar.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtInterceptor } from './services/jwt-interceptor.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { TransactComponent } from './components/transact/transact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,
    MyaccountComponent,
    LandingComponent,
    CategoryDetailsComponent,
    PaymentComponent,
    InsightsComponent,
    ActivationComponent,
    PaybillComponent,
    TillnumberComponent,
    SendmoneyComponent,
    PasswordComponent,
    AdminRegistrationComponent,
    AdminLoginComponent,
    AdminVerificationComponent,
    AdminVerificationdetailsComponent,
    AdminnavbarComponent,

    ErrorPageComponent,
     CreateAccountComponent,
     TransactComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
                // timeOut:3000,
                progressBar:true,
                progressAnimation:'increasing',
                preventDuplicates:true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
