// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
// import { BillService } from 'src/services/bill.service';
// import { Bill } from 'src/models/bill';


// @Component({
//   selector: 'app-addbill',
//   templateUrl: './addbill.component.html',
//   styleUrls: ['./addbill.component.css']
// })
// export class AddBillComponent implements OnInit {
//   addBill: FormGroup;
//   message: string | null = null;
//   nonNegativeValidator: any | string;

//   constructor(
//     private billService: BillService,
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//     this.addBill = this.formBuilder.group({
      
//       // billgendate: ['', Validators.required],
//       billgendate: new FormControl('', [Validators.required, this.futureDateValidator]),

//       perunitcost:['', [20,Validators.required, Validators.min(1)]],
//       // totalunits: ['', [Validators.required, Validators.min(1)]],
//       totalunits: ['', [Validators.required, Validators.min(1), this.nonNegativeValidator]], // Apply custom non-negative validator

//       billamount: ['', Validators.required],
//       billduedate: ['', Validators.required],
//       id: ['', Validators.required],
//     });

//     // Subscribe to value changes in perunitcost and totalunits to dynamically update billamount
//     this.addBill.get('perunitcost')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });

//     this.addBill.get('totalunits')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });
//   }

//   ngOnInit(): void {
//   }

//   updateBillAmount() {
//     const perUnitCost = this.addBill.get('perunitcost')!.value;
//     const totalUnits = this.addBill.get('totalunits')!.value;
//     if (perUnitCost && totalUnits) {
//       this.addBill.get('billamount')!.setValue(perUnitCost * totalUnits);
//     }
//   }

//   addBillDetails() {
//     if (this.addBill.valid) {
//       const billData: Bill = this.addBill.value;

//       // Additional processing if needed before sending the request

//       this.billService.addBill(billData).subscribe(
//         response => {
//           this.message = "Bill Details Successfully Added";
//           this.addBill.reset();
//         },
//         error => {
//           console.error(error);
//           // Handle error appropriately
//         }
//       );
//     } else {
//       this.message = 'Please fill out all fields.';
//     }
//   }

//   backToHome() {
//     this.router.navigate(['/bills']);
//   }

//   closePopup() {
//     this.message = null;
//   }

//    futureDateValidator(control: FormControl): { [key: string]: any } | null {
//     const currentDate = new Date();
//     const selectedDate = new Date(control.value);
  
//     if (selectedDate > currentDate) {
//       return { futureDate: true }; // Validation fails if date is in the future
//     }
    
//     return null; // Validation passes if date is not in the future
//   }

// }




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
// import { BillService } from 'src/services/bill.service';
// import { Bill } from 'src/models/bill';

// @Component({
//   selector: 'app-addbill',
//   templateUrl: './addbill.component.html',
//   styleUrls: ['./addbill.component.css']
// })
// export class AddBillComponent implements OnInit {
//   addBill: FormGroup;
//   message: string | null = null;

//   constructor(
//     private billService: BillService,
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//     this.addBill = this.formBuilder.group({
//       billgendate: new FormControl('', [Validators.required, this.futureDateValidator]),
//       perunitcost: [20, [Validators.required, Validators.min(1)]],
//       totalunits: ['', [Validators.required, Validators.min(1), this.nonNegativeValidator]], // Apply custom non-negative validator
//       billamount: ['', Validators.required],
//       billduedate: ['', Validators.required],
//       id: ['', Validators.required],
//     });

//     // Subscribe to value changes in perunitcost and totalunits to dynamically update billamount
//     this.addBill.get('perunitcost')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });

//     this.addBill.get('totalunits')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });
//   }

//   ngOnInit(): void {
//   }

//   updateBillAmount() {
//     const perUnitCost = this.addBill.get('perunitcost')!.value;
//     const totalUnits = this.addBill.get('totalunits')!.value;
//     if (perUnitCost && totalUnits) {
//       this.addBill.get('billamount')!.setValue(perUnitCost * totalUnits);
//     }
//   }

//   addBillDetails() {
//     if (this.addBill.valid) {
//       const billData: Bill = this.addBill.value;

//       // Additional processing if needed before sending the request

//       this.billService.addBill(billData).subscribe(
//         response => {
//           this.message = "Bill Details Successfully Added";
//           this.addBill.reset();
//         },
//         error => {
//           console.error(error);
//           // Handle error appropriately
//         }
//       );
//     } else {
//       this.message = 'Please fill out all fields.';
//     }
//   }

//   backToHome() {
//     this.router.navigate(['/bills']);
//   }

//   closePopup() {
//     this.message = null;
//   }

//   futureDateValidator(control: FormControl): { [key: string]: any } | null {
//     const currentDate = new Date();
//     const selectedDate = new Date(control.value);
  
//     if (selectedDate > currentDate) {
//       return { futureDate: true }; // Validation fails if date is in the future
//     }
    
//     return null; // Validation passes if date is not in the future
//   }

  

//   nonNegativeValidator(control: FormControl): { [key: string]: any } | null {
//     if (control.value < 0) {
//       return { negativeValue: true }; // Validation fails if value is negative
//     }
    
//     return null; // Validation passes if value is not negative
//   }
// }




import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { BillService } from 'src/services/bill.service';
import { Bill } from 'src/models/bill';

@Component({
  selector: 'app-addbill',
  templateUrl: './addbill.component.html',
  styleUrls: ['./addbill.component.css']
})
export class AddBillComponent implements OnInit {
  addBill: FormGroup;
  message: string | null = null;

  constructor(
    private billService: BillService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.addBill = this.formBuilder.group({
      billgendate: new FormControl('', [Validators.required, this.futureDateValidator]),
      perunitcost: [20, [Validators.required, Validators.min(1)]],
      totalunits: ['', [Validators.required, Validators.min(1), this.nonNegativeValidator]], // Apply custom non-negative validator
      billamount: ['', Validators.required],
      billduedate: ['', [Validators.required, this.futureOrTodayDateValidator]], // Apply custom future or today date validator
      id: ['', Validators.required],
    });

    // Subscribe to value changes in perunitcost and totalunits to dynamically update billamount
    this.addBill.get('perunitcost')!.valueChanges.subscribe(() => {
      this.updateBillAmount();
    });

    this.addBill.get('totalunits')!.valueChanges.subscribe(() => {
      this.updateBillAmount();
    });
  }

  ngOnInit(): void {
  }

  updateBillAmount() {
    const perUnitCost = this.addBill.get('perunitcost')!.value;
    const totalUnits = this.addBill.get('totalunits')!.value;
    if (perUnitCost && totalUnits) {
      this.addBill.get('billamount')!.setValue(perUnitCost * totalUnits);
    }
  }

  addBillDetails() {
    if (this.addBill.valid) {
      const billData: Bill = this.addBill.value;

      // Additional processing if needed before sending the request

      this.billService.addBill(billData).subscribe(
        response => {
          this.message = "Bill Details Successfully Added";
          this.addBill.reset();
        },
        error => {
          console.error(error);
          // Handle error appropriately
        }
      );
    } else {
      this.message = 'Please fill out all fields.';
    }
  }

  backToHome() {
    this.router.navigate(['/bills']);
  }

  closePopup() {
    this.message = null;
  }

  futureDateValidator(control: FormControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
  
    if (selectedDate > currentDate) {
      return { futureDate: true }; // Validation fails if date is in the future
    }
    
    return null; // Validation passes if date is not in the future
  }

  nonNegativeValidator(control: FormControl): { [key: string]: any } | null {
    if (control.value < 0) {
      return { negativeValue: true }; // Validation fails if value is negative
    }
    
    return null; // Validation passes if value is not negative
  }

  futureOrTodayDateValidator(control: FormControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const selectedDate = new Date(control.value);
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
  
    if (selectedDate.getTime() < currentDate.getTime()) {
      return { pastDate: true }; // Validation fails if date is in the past
    }
    
    return null; // Validation passes if date is today or in the future
  }
}
