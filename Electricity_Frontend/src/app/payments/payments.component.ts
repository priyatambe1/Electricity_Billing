import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/models/payment';
import { PaymentService } from 'src/services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.paymentService.getPayments()
      .subscribe((payments: Payment[]) => this.payments = payments);
  }

  backToHome() {
    this.router.navigate(['/admindashboard']);
  }
}
