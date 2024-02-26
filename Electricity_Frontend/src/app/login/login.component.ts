import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import necessary form-related modules
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Define a FormGroup to manage form controls

  modelText: string = "";
  modelHeader: string = "";
  showSpinner: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) {
    // Initialize the form group and define form controls
    this.loginForm = this.fb.group({
      emailid: ['', [Validators.required, Validators.email]], // Define form control for email with validation
      password: ['', Validators.required] // Define form control for password with validation
    });
  }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.valid) { // Check if the form is valid before attempting to login
      this._auth.loginUser(this.loginForm.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          if (res.isadmin)
            this._router.navigate(['/admin']);
          else
            this._router.navigate(['/customer']);
        },
        err => console.log(err)
      );
    } else {
      // Handle form validation errors
    }
  }

  // Convenience getter for easy access to form controls
  get f() { return this.loginForm.controls; }
}
