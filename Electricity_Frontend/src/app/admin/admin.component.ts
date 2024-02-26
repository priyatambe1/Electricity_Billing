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

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.adminService.getUsers().subscribe(
      (response) => {
        this.users = response || []; // Ensure users array is initialized even if response is null
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser(): void {
    this.adminService.addUser(this.newUser).subscribe(
      (response) => {
        this.users.push(response);
        this.newUser = {}; // Reset the new user object
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
    this.adminService.updateUser(this.editingUser).subscribe(
      () => {
        const index = this.users.findIndex(u => u.id === this.editingUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.editingUser };
        }
        this.cancelEdit();
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
  }
}
