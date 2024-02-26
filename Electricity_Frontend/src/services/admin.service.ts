// admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userUrl, registerUrl, loginUrl } from './Apis';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUri = 'http://localhost:5245/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(userUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(userUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${userUrl}/${user.id}`, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${userUrl}/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(registerUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>(loginUrl, credentials)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
