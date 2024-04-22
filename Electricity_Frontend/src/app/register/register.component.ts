import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/models/login';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData1 = {
    isadmin: 0 // Default value set to 0
  };
  registerUserData: login = new login();
  modelText: string = "";
  modelHeader: string = "";
  showSpinner: boolean = false;
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  DisplayModalPopup(modelHeader: string, modelText: string) {
    this.modelHeader = modelHeader;
    this.modelText = modelText;
    document.getElementById("btnLaunchModel")?.click();
  }
  ShowSpinner() {
    this.showSpinner = true;
  }
  HideSpinner() {
    this.showSpinner = false;
  }

    registerUser() {
      if (!this.registerUserData.emailid || !this.registerUserData.password) {
        alert('Please fill in all the required fields.');
        return;
      }
      if (!/.+@.+\..+/.test(this.registerUserData.emailid)) {
        alert('Please enter a valid email address (ending with @example.com)');
        return;
      }
      const phoneNumber = String(this.registerUserData.phonenumber);

      if (!phoneNumber || !phoneNumber.match(/^[7-9][0-9]{9}$/)) {
          alert('Please enter a 10-digit number starting with 7, 8, or 9');
          return;
      }
   
   
    this.ShowSpinner();
    var userDataObject = {
      emailid: this.registerUserData.emailid,
      password: this.registerUserData.password,
      fullname: this.registerUserData.fullname,
      Address: this.registerUserData.address, 
      Phonenumber: this.registerUserData.phonenumber,
      Isadmin: this.registerUserData1.isadmin,

    }
    this._auth.registerUser(userDataObject).subscribe(res => {
      this.HideSpinner(); localStorage.setItem('token', res.token);
      this._router.navigate(['/login'])
    },
      err => {this.HideSpinner();
      console.log(err)});
  }
  hasError(typeofvalidator:string,controlname:string):Boolean{

    return this.registerUserData.formLoginGroup.controls[controlname].hasError(typeofvalidator);

  }
}