import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 

  modelText: string = "";
  modelHeader: string = "";
  showSpinner: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      emailid: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required] 
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.valid) { 
      this._auth.loginUser(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          if (res.isadmin)
            
            this._router.navigate(['/admindashboard']);
            
          else
            this._router.navigate(['/customerdashboard']);
            alert('Login successful');

        },
        err => console.log(err)
        
      );
    } else {
      alert('Fields cannot be wrong and blank.');
    }
  }
 

  get f() { return this.loginForm.controls; }
}
