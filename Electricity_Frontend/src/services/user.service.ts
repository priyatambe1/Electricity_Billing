// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserUrl = 'http://localhost:5245/api/User'; // URL to fetch current user details

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.currentUserUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(user: any): Observable<any> {
    const updateUserUrl = `${this.currentUserUrl}/${user.id}`; // Include user ID in the update URL
    return this.http.put<any>(updateUserUrl, user)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}
