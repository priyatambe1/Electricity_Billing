import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/models/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentsUrl = 'http://localhost:5245/api/Payment'; // Assuming you have an API endpoint for payments

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.paymentsUrl);
  }

  addPayment(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.paymentsUrl, payment);
  }

  updatePayment(payment: Payment): Observable<Payment> {
    const url = `${this.paymentsUrl}/${payment.id}`;
    return this.http.put<Payment>(url, payment);
  }

  deletePayment(id: number): Observable<void> {
    const url = `${this.paymentsUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
