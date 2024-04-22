// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { loginUrl, registerUrl, userUrl } from './Apis';


// @Injectable()
// export class AuthService {
//   private _registerUrl = registerUrl;
//   private _loginUrl = loginUrl;
//   private _userUrl = userUrl;

//   constructor(private http: HttpClient,private _router:Router) { }

//   registerUser(user: any) {
//     return this.http.post<any>(this._registerUrl, user);
//   }
//   loginUser(user: any) {
//     return this.http.post<any>(this._loginUrl, user);
//   }
//   loggedIn()
//   {
//     return !!localStorage.getItem('token')
//   }
//   logoutUser(){
//     localStorage.removeItem('token');
//     this._router.navigate(['/home']);
//   }
//   getUsers(){
//     return this.http.get<any>(this._userUrl);
//   }
//   getToken(){
//     return localStorage.getItem('token');
//   }

//   getProfile() {
//     return this.http.get<any>(this._loginUrl);
//   }
// }



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  private _registerUrl = 'http://localhost:5245/api/Login/register';
  private _loginUrl = 'http://localhost:5245/api/Login/login';
  private _userUrl = 'http://localhost:5245/api/User';
  private _userProfileUrl = 'http://localhost:5245/api/User/profile';

  constructor(private http: HttpClient, private _router: Router) {}

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap(response => {
        // Store the JWT token in local storage
        localStorage.setItem('token', response.token);
      })
    );
  }

  loggedIn(): boolean {
    // Check if token exists and is not expired
    const token = localStorage.getItem('token');
    if (token) {
      const tokenPayload: any = jwtDecode(token);
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return tokenPayload.exp > currentTimestamp;
    }
    return false;
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/home']);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(this._userUrl);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getProfile(): Observable<any> {
    // Include the JWT token in the request headers
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any>(this._userProfileUrl, { headers });
    } else {
      // Handle case where token is not available
      console.error('JWT token not found in local storage');
      // Optionally, you can return throwError or handle the error in another way
      // Here, we'll return an empty Observable to prevent errors
      return new Observable<any>();
    }
  }
}
