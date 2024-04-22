import { Component, OnInit } from '@angular/core';
import { login } from 'src/models/login';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  currentUser: login = new login(); // Initialize with an instance of Login
  editing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser()
      .subscribe(
        (user: login) => {
          console.log(user);
          this.currentUser = user;
        },
        error => {
          console.error('Error loading current user:', error);
          // Handle error as needed
        }
      );
  }

  editUser(): void {
    // Set editing flag to true to display edit form
    this.editing = true;
  }

  saveUser(): void {
    this.userService.updateUser(this.currentUser)
      .subscribe(
        response => {
          console.log('User updated successfully:', response);
          // After successful update, reload current user data
          this.loadCurrentUser();
          // Reset editing flag
          this.editing = false;
        },
        error => {
          console.error('Error updating user:', error);
          // Handle error as needed
        }
      );
  }
}
