// custpayment.component.ts
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/models/payment';
import { PaymentService } from 'src/services/payment.service';


@Component({
  selector: 'app-custpayment',
  templateUrl: './custpayment.component.html',
  styleUrls: ['./custpayment.component.css']
})
export class CustpaymentComponent 
// implements OnInit 
{

  // payments: Payment[] = [];
  // newPayment: Payment = {
  //   paymentid: 0,
  //   billid: 0,
  //   id: 0,
  //   paymentdate: '',
  //   paymentstatus: ''
  // };

  // constructor(private paymentService: PaymentService) { }

  // ngOnInit(): void {
  //   this.getPayments();
  // }

  // getPayments() {
  //   this.paymentService.getPayments().subscribe(
  //     payments => {
  //       this.payments = payments;
  //     },
  //     error => {
  //       console.error('Error fetching payments:', error);
  //     }
  //   );
  // }

  // addPayment() {
  //   this.paymentService.addPayment(this.newPayment).subscribe(
  //     () => {
  //       console.log('Payment added successfully.');
  //       this.getPayments(); // Refresh payments after adding a new one
  //       this.resetNewPayment(); // Reset newPayment object
  //     },
  //     error => {
  //       console.error('Error adding payment:', error);
  //     }
  //   );
  // }

  // resetNewPayment() {
  //   this.newPayment = {
  //     paymentid: 0,
  //     billid: 0,
  //     id: 0,
  //     paymentdate: '',
  //     paymentstatus: ''
  //   };
  // }

  // formattedDate(dateString: string): string {
  //   return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  // }

}
