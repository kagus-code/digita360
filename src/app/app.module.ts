import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    routingComponents,
    ActivationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
