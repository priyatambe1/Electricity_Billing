// // admin.component.ts
// import { Component, OnInit } from '@angular/core';
// import { AdminService } from 'src/services/admin.service';

// @Component({
//   selector: 'app-admin',
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {
//   users: any[] = [];
//   newUser: any = {};
//   editingUser: any = {};
//   isEditing = false;

//   constructor(private adminService: AdminService) { }

//   ngOnInit(): void {
//     this.getUsers();
//   }

//   getUsers(): void {
//     this.adminService.getUsers().subscribe(
//       (response) => {
//         // this.users = response || []; 
//         this.users = (response || []).filter((user: { isadmin: number; }) => user.isadmin === 0);// Filter out users with isadmin = 0
//       },
//       (error) => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   addUser(): void {
//     this.adminService.addUser(this.newUser).subscribe(
//       (response) => {
//         this.users.push(response);
//         this.newUser = {}; // Reset the new user object
//       },
//       (error) => {
//         console.error('Error adding user:', error);
//       }
//     );
//   }

//   editUser(user: any): void {
//     this.editingUser = { ...user };
//     this.isEditing = true;
//   }

//   updateUser(): void {
//     this.adminService.updateUser(this.editingUser).subscribe(
//       () => {
//         const index = this.users.findIndex(u => u.id === this.editingUser.id);
//         if (index !== -1) {
//           this.users[index] = { ...this.editingUser };
//         }
//         this.cancelEdit();
//       },
//       (error) => {
//         console.error('Error updating user:', error);
//       }
//     );
//   }

//   deleteUser(userId: number): void {
//     this.adminService.deleteUser(userId).subscribe(
//       () => {
//         this.users = this.users.filter(u => u.id !== userId);
//       },
//       (error) => {
//         console.error('Error deleting user:', error);
//       }
//     );
//   }

//   cancelEdit(): void {
//     this.editingUser = {};
//     this.isEditing = false;
//   }
// }




// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  newUser: any = {};
  editingUser: any = {};
  isEditing = false;
  formSubmitted = false; // Add this line

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe(
      (response) => {
        // this.users = response || []; 
        this.users = (response || []).filter((user: { isadmin: number; }) => user.isadmin === 0);// Filter out users with isadmin = 0
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // addUser(): void {
  //   this.formSubmitted = true; // Set formSubmitted to true
  //   if (!this.isFormValid()) return; // Check if the form is valid
  //   this.adminService.addUser(this.newUser).subscribe(
  //     (response) => {
  //       this.users.push(response);
  //       this.newUser = {}; // Reset the new user object
  //       this.formSubmitted = false; // Reset formSubmitted after successful submission
  //     },
  //     (error) => {
  //       console.error('Error adding user:', error);
  //     }
  //   );
  // }
  addUser(): void {
    this.formSubmitted = true; // Set formSubmitted to true
    if (!this.isFormValid()) return; // Check if the form is valid
    
    // Set default value for isadmin
    this.newUser.isadmin = 0;

    this.adminService.addUser(this.newUser).subscribe(
      (response) => {
        this.users.push(response);
        this.newUser = {}; // Reset the new user object
        this.formSubmitted = false; // Reset formSubmitted after successful submission
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
}


  editUser(user: any): void {
    this.editingUser = { ...user };
    this.isEditing = true;
  }

  updateUser(): void {
    this.formSubmitted = true; // Set formSubmitted to true
    if (!this.isFormValid()) return; // Check if the form is valid
    this.adminService.updateUser(this.editingUser).subscribe(
      () => {
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editingUser };
        }
        this.cancelEdit();
        this.formSubmitted = false; // Reset formSubmitted after successful submission
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    this.adminService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter(u => u.id !== userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  cancelEdit(): void {
    this.editingUser = {};
    this.isEditing = false;
    this.formSubmitted = false; // Reset formSubmitted when canceling edit
  }

  isFormValid(): boolean {
    // Implement your form validation logic here
    // For example, you can check if all required fields are filled
    if (this.isEditing) {
      // For editing, you might have different validation criteria
      // Return true/false based on your validation logic
    } else {
      // For adding new user, check if all required fields are filled
      if (!this.newUser.emailid || !this.newUser.password || !this.newUser.fullname || !this.newUser.phonenumber || !this.newUser.address) {
        return false; // Form is not valid if any required field is missing
      }
    }
    return true;
  }
}
