// // user.component.ts
// import { Component, OnInit } from '@angular/core';
// import { login } from 'src/models/login';
// import { UserService } from 'src/services/user.service';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css']
// })
// export class UserComponent implements OnInit {
//   id?: number;
//   user!: login;
//   showUpdateConfirmation: boolean = false; // Define showUpdateConfirmation property
//   updateSuccessMessage: boolean = false;

//   constructor(private userService: UserService) { }

//   ngOnInit() {
    
//   }

  
//   getUser() {
//     if (this.id) {
//       this.userService.getUserById(this.id).subscribe(
//         user => {
//           if (user.isadmin === 0) {
//             this.user = user;
//           } else {
    
//           }
//         }, 
//         error => {
//           console.error('Error fetching user:', error);
      
//         }
//       );
//     }
//   }
  
    
  

//   updateUser() {
//     this.userService.updateUser(this.user).subscribe(() => {
//       console.log('User updated successfully');
//       this.updateSuccessMessage = true;
//     }, error => {
//       console.log('Error updating user:', error);
//       this.showUpdateConfirmation = false;    });
//   }

 
// }


import { Component, OnInit } from '@angular/core';
import { login } from 'src/models/login';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id?: number;
  user!: login;
  userProfile!: login; // Define userProfile property
  showUpdateConfirmation: boolean = false;
  updateSuccessMessage: boolean = false;
  userService: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getUserProfile(); // Fetch user profile when component initializes
  }

  getUserProfile() {
    this.authService.getProfile().subscribe(
      userProfile => {
        this.userProfile = userProfile;
      },
      error => {
        console.error('Error fetching user profile:', error);
        // Optionally, handle errors here
      }
    );
  }
}
//   getUser() {
//     if (this.id) {
//       this.userService.getUserById(this.id).subscribe(
//         user => {
//           if (user.isadmin === 0) {
//             this.user = user;
//           } else {
//             // Handle case where user is an admin
//           }
//         }, 
//         error => {
//           console.error('Error fetching user:', error);
//         }
//       );
//     }
//   }

//   updateUser() {
//     this.authService.updateUser(this.user).subscribe(
//       () => {
//         console.log('User updated successfully');
//         this.updateSuccessMessage = true;
//       },
//       error => {
//         console.log('Error updating user:', error);
//         this.showUpdateConfirmation = false;
//       }
//     );
//   }

// }
