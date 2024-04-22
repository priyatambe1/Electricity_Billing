// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Bill } from 'src/models/bill';
// import { BillService } from 'src/services/bill.service';
// @Component({
//   selector: 'app-bills',
//   templateUrl: './bills.component.html',
//   styleUrls: ['./bills.component.css']
// })
// export class BillsComponent implements OnInit {
//   bills: any[] = [];
//   editingBill: any = {};
//   isEditing = false;
//   billForm!: FormGroup;
//   router: any;
//   message: string | null = null;


//   constructor(
//     private billService: BillService,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.loadBills();
//     this.initializeForm();
//   }

//   initializeForm(): void {
//     this.billForm = this.formBuilder.group({
//       billid: [''], // Include billid field but keep it hidden in the form
//       billgendate: new FormControl('', [Validators.required, this.futureDateValidator]),
//       perunitcost: [20, [Validators.required, Validators.min(1)]],
//       totalunits: ['', [Validators.required, Validators.min(1), this.nonNegativeValidator]], // Apply custom non-negative validator
//       billamount: ['', Validators.required],
//       billduedate: ['', [Validators.required, this.futureOrTodayDateValidator]], // Apply custom future or today date validator
//       id: ['', Validators.required],
//     });

//     // Subscribe to value changes in perunitcost and totalunits to dynamically update billamount
//     this.billForm.get('perunitcost')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });

//     this.billForm.get('totalunits')!.valueChanges.subscribe(() => {
//       this.updateBillAmount();
//     });
//   }

//   updateBillAmount(): void {
//     const perUnitCost = this.billForm.get('perunitcost')!.value;
//     const totalUnits = this.billForm.get('totalunits')!.value;
//     if (perUnitCost && totalUnits) {
//       this.billForm.get('billamount')!.setValue(perUnitCost * totalUnits);
//     }
//   }

//   loadBills(): void {
//     this.billService.getBills().subscribe(
//       (response) => {
//         this.bills = response || [];
//       },
//       (error) => {
//         console.error('Error fetching bills:', error);
//       }
//     );
//   }

//   addBill(): void {
//     if (this.billForm.valid) {
//       const formData: Bill = this.prepareFormData(this.billForm.value);
//       this.billService.addBill(formData).subscribe(
//         (response) => {
//           this.bills.push(response);
          
//           this.billForm.reset();
//         },
//         (error) => {
//           console.error('Error adding bill:', error);
//         }
//       );
//     } else {
//       console.error('Form validation failed.');
//     }
//   }

//   editBill(bill: any): void {
//     this.editingBill = { ...bill };
//     this.isEditing = true;
//     this.patchFormValues(this.editingBill);
//   }

//   updateBill(): void {
//     if (this.billForm.valid) {
//       const formData = this.prepareFormData(this.billForm.value);
//       this.billService.updateBill(formData).subscribe(
//         () => {
//           // Update bill in the local array
//           const index = this.bills.findIndex(b => b.billid === formData.billid);
//           if (index !== -1) {
//             this.bills[index] = { ...formData };

//           }
//           this.cancelEdit();
//           this.message = "Bill edited successfully ";

          
//         },
//         (error) => {
//           console.error('Error updating bill:', error);
//         }
//       );
//     } else {
//       console.error('Form validation failed.');
//     }
//   }

//   deleteBill(billId: number): void {
//     this.billService.deleteBill(billId).subscribe(
//       () => {
//         this.bills = this.bills.filter(b => b.billid !== billId);
//         this.message = "Bill deleted successfully ";

//       },
//       (error) => {
//         console.error('Error deleting bill:', error);
//       }
//     );
//   }

//   cancelEdit(): void {
//     this.editingBill = {};
//     this.isEditing = false;
//     this.billForm.reset();
//   }

//   // Helper function to prepare form data
//   prepareFormData(formData: any): any {
//     // Convert date format if needed
//     formData.billgendate = this.formatDate(formData.billgendate);
//     formData.billduedate = this.formatDate(formData.billduedate);
//     return formData;
//   }

//   // Helper function to format date
//   formatDate(date: any): string {
//     // Convert date to ISO string
//     return new Date(date).toISOString().substring(0, 10); // Adjusted to only include date part
//   }

//   // Helper function to patch form values for editing
//   patchFormValues(billData: any): void {
//     // Adjust dates to local timezone
//     const gendate = new Date(billData.billgendate);
//     const duedate = new Date(billData.billduedate);

//     // Ensure correct timezone adjustment
//     const localTimezoneOffset = gendate.getTimezoneOffset() * 60000; // in milliseconds
//     billData.billgendate = new Date(gendate.getTime() - localTimezoneOffset).toISOString().substring(0, 10);
//     billData.billduedate = new Date(duedate.getTime() - localTimezoneOffset).toISOString().substring(0, 10);

//     // Patch form values
//     this.billForm.patchValue({
//       billid: billData.billid,
//       billgendate: billData.billgendate,
//       perunitcost: billData.perunitcost,
//       totalunits: billData.totalunits,
//       billamount: billData.billamount,
//       billduedate: billData.billduedate,
//       id: billData.id
//     });
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

//   futureOrTodayDateValidator(control: FormControl): { [key: string]: any } | null {
//     const currentDate = new Date();
//     const selectedDate = new Date(control.value);
//     selectedDate.setHours(0, 0, 0, 0);
//     currentDate.setHours(0, 0, 0, 0);
  
//     if (selectedDate.getTime() < currentDate.getTime()) {
//       return { pastDate: true }; // Validation fails if date is in the past
//     }
    
//     return null; // Validation passes if date is today or in the future
//   }
// }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Bill } from 'src/models/bill';
import { BillService } from 'src/services/bill.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: any[] = [];
  editingBill: any = {};
  isEditing = false;
  billForm!: FormGroup;
  message: string | null = null;
  

  constructor(
    private billService: BillService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadBills();
    this.initializeForm();
  }

  initializeForm(): void {
    this.billForm = this.formBuilder.group({
      billid: [''], // Include billid field but keep it hidden in the form
      billgendate: new FormControl('', [Validators.required, this.futureDateValidator]),
      perunitcost: [20, [Validators.required, Validators.min(1)]],
      totalunits: ['', [Validators.required, Validators.min(1), this.nonNegativeValidator]], // Apply custom non-negative validator
      billamount: ['', Validators.required],
      billduedate: ['', [Validators.required, this.futureOrTodayDateValidator]], // Apply custom future or today date validator
      id: ['', Validators.required],
    });

    // Subscribe to value changes in perunitcost and totalunits to dynamically update billamount
    this.billForm.get('perunitcost')!.valueChanges.subscribe(() => {
      this.updateBillAmount();
    });

    this.billForm.get('totalunits')!.valueChanges.subscribe(() => {
      this.updateBillAmount();
    });
  }

  updateBillAmount(): void {
    const perUnitCost = this.billForm.get('perunitcost')!.value;
    const totalUnits = this.billForm.get('totalunits')!.value;
    if (perUnitCost && totalUnits) {
      this.billForm.get('billamount')!.setValue(perUnitCost * totalUnits);
    }
  }

  loadBills(): void {
    this.billService.getBills().subscribe(
      (response) => {
        this.bills = response || [];
      },
      (error) => {
        console.error('Error fetching bills:', error);
      }
    );
  }

  addBill(): void {
    if (this.billForm.valid) {
      const formData: Bill = this.prepareFormData(this.billForm.value);
      this.billService.addBill(formData).subscribe(
        (response) => {
          this.bills.push(response);
          this.billForm.reset();
          this.message = "Bill added successfully";
        },
        (error) => {
          console.error('Error adding bill:', error);
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }

  editBill(bill: any): void {
    this.editingBill = { ...bill };
    this.isEditing = true;
    this.patchFormValues(this.editingBill);
  }

  updateBill(): void {
    if (this.billForm.valid) {
      const formData = this.prepareFormData(this.billForm.value);
      this.billService.updateBill(formData).subscribe(
        () => {
          // Update bill in the local array
          const index = this.bills.findIndex(b => b.billid === formData.billid);
          if (index !== -1) {
            this.bills[index] = { ...formData };
          }
          this.cancelEdit();
          this.message = "Bill edited successfully";
        },
        (error) => {
          console.error('Error updating bill:', error);
        }
      );
    } else {
      console.error('Form validation failed.');
    }
  }

  deleteBill(billId: number): void {
    this.billService.deleteBill(billId).subscribe(
      () => {
        this.bills = this.bills.filter(b => b.billid !== billId);
        this.message = "Bill deleted successfully";
      },
      (error) => {
        console.error('Error deleting bill:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingBill = {};
    this.isEditing = false;
    this.billForm.reset();
  }

  // Helper function to prepare form data
  prepareFormData(formData: any): any {
    // Convert date format if needed
    formData.billgendate = this.formatDate(formData.billgendate);
    formData.billduedate = this.formatDate(formData.billduedate);
    return formData;
  }

  // Helper function to format date
  formatDate(date: any): string {
    // Convert date to ISO string
    return new Date(date).toISOString().substring(0, 10); // Adjusted to only include date part
  }

  // Helper function to patch form values for editing
  patchFormValues(billData: any): void {
    // Adjust dates to local timezone
    const gendate = new Date(billData.billgendate);
    const duedate = new Date(billData.billduedate);

    // Ensure correct timezone adjustment
    const localTimezoneOffset = gendate.getTimezoneOffset() * 60000; // in milliseconds
    billData.billgendate = new Date(gendate.getTime() - localTimezoneOffset).toISOString().substring(0, 10);
    billData.billduedate = new Date(duedate.getTime() - localTimezoneOffset).toISOString().substring(0, 10);

    // Patch form values
    this.billForm.patchValue({
      billid: billData.billid,
      billgendate: billData.billgendate,
      perunitcost: billData.perunitcost,
      totalunits: billData.totalunits,
      billamount: billData.billamount,
      billduedate: billData.billduedate,
      id: billData.id
    });
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
