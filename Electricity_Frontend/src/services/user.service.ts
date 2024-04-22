// // user.service.ts
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { login } from '../models/login'; // Assuming login model is in the models folder

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   private userUrl = 'http://localhost:5245/api/User'; // Base URL for user API

//   constructor(private http: HttpClient) { }

//   getUserById(userId: number): Observable<login> {
//     const url = `${this.userUrl}/${userId}`;
//     return this.http.get<login>(url)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   updateUser(user: login): Observable<login> {
//     const url = `${this.userUrl}/${user.id}`;
//     return this.http.put<login>(url, user)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

  

//   private handleError(error: any): Observable<never> {
//     console.error('An error occurred:', error);
//     return throwError('Something bad happened; please try again later.');
//   }
// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { login } from '../models/login'; // Assuming login model is in the models folder

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:5245/api/User'; // Base URL for user API
  private userProfileUrl = 'http://localhost:5245/api/User/profile'; // URL for user profile API

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<login> {
    const url = `${this.userUrl}/${userId}`;
    return this.http.get<login>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(user: login): Observable<login> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http.put<login>(url, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  // getUserProfile(): Observable<login> {
  //   // Retrieve the JWT token from local storage
  //   const token = localStorage.getItem('jwtToken');
  
  //   // If token is available, include it in the request headers
  //   if (token) {
  //     const httpOptions = {
  //       headers: new HttpHeaders({
  //         'Authorization': `Bearer ${token}`
  //       })
  //     };
  //     return this.http.get<login>(this.userProfileUrl, httpOptions)
  //       .pipe(
  //         catchError(this.handleError)
  //       );
  //   } else {
  //     // Handle case where token is not available
  //     console.error('JWT token not found in local storage');
  //     return throwError('JWT token not found');
  //   }
  // }
  

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
