
import { Component } from '@angular/core';
import { Bill } from 'src/models/bill';
import { login } from 'src/models/login';
import { BillService } from 'src/services/bill.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-custbill',
  templateUrl: './custbill.component.html',
  styleUrls: ['./custbill.component.css']
})
export class CustbillComponent {
  billid?: number;
  bill!: Bill;
  login!: login; // Define login property

  constructor(
    private billService: BillService,
    private loginService: UserService // Inject LoginService
  ) {}

  getBillById(): void {
    if (this.billid) {
      this.billService.getBill(this.billid).subscribe(
        (bill: Bill) => {
          this.bill = bill;
          console.log('Fetched bill:', bill);
          // Fetch login details based on the login ID from the bill object
          if (bill.id) {
            this.loginService.getUserById(bill.id).subscribe(
              (login: login) => {
                this.login = login;
                console.log('Fetched login:', login);
              },
              (error) => {
                console.error('Error fetching login:', error);
              }
            );
          }
        },
        (error) => {
          console.error('Error fetching bill:', error);
        }
      );
    }

  }
  showPaymentAlert(): void {
    window.alert('Payment successful!');
  }
}