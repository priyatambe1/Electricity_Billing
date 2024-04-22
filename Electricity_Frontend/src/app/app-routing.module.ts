import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { AdminComponent } from './admin/admin.component';

import { HomedashboardcardComponent } from './homedashboardcard/homedashboardcard.component';
import { HomedeshComponent } from './homedesh/homedesh.component';
import { EmptyComponent } from './empty/empty.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HeaderComponent } from './header/header.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { CustomerdashboardComponent } from './customerdashboard/customerdashboard.component';
import { BillsComponent } from './bills/bills.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddBillComponent } from './addbill/addbill.component';
import { CustbillComponent } from './custbill/custbill.component';
import { CustpaymentComponent } from './custpayment/custpayment.component';


const routes: Routes = [

  {
    path:'',
    component:HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
     path: 'navbar',
     component: NavbarComponent
   },
   {
    path: 'footer',
    component: FooterComponent
  },
   {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'homedashboardcard',
    component: HomedashboardcardComponent
  },
  {
    path: 'homedesh',
    component: HomedeshComponent
  },
  {
    path: 'empty',
    component: EmptyComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'admindashboard',
    component: AdmindashboardComponent
  },
  {
    path: 'customerdashboard',
    component: CustomerdashboardComponent
  },
  {
    path: 'bills',
    component: BillsComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },  
  {
    path: 'addbill',
    component: AddBillComponent
  },
  {
    path: 'custbill',
    component: CustbillComponent
  },
  {
    path: 'custpayment',
    component: CustpaymentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
