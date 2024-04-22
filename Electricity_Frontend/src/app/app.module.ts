import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { JwtHelperService,JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { DemoComponent } from './demo/demo.component';
import { EmptyComponent } from './empty/empty.component';
import { HomedeshComponent } from './homedesh/homedesh.component';
import { HomedashboardcardComponent } from './homedashboardcard/homedashboardcard.component';
import { UserComponent } from './user/user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HeaderComponent } from './header/header.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { BillsComponent } from './bills/bills.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddBillComponent }  from './addbill/addbill.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustbillComponent } from './custbill/custbill.component';
import { CustpaymentComponent } from './custpayment/custpayment.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AdminComponent,
    DemoComponent,
    EmptyComponent,
    HomedeshComponent,
    HomedashboardcardComponent,
    UserComponent,
    AboutUsComponent,
    ContactUsComponent,
    HeaderComponent,
    PrivacyComponent,
    AdmindashboardComponent,
    CustomerdashboardComponent,
    BillsComponent,
    PaymentsComponent,
    AddBillComponent,
    CustbillComponent,
    CustpaymentComponent
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule
    
  ],
  providers: [AuthService,{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
