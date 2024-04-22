import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:5245'; 

  constructor(private http: HttpClient) { }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/api/bill`);
  }
  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.apiUrl}/api/bill/${id}`);
  }

  addBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(`${this.apiUrl}/api/bill`, bill);
  }

  updateBill(bill: Bill): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/bill/${bill.billid}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/bill/${id}`);
  }

  

}


