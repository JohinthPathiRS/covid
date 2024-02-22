// Modify your UserLoginComponent to use the new login endpoint
// user-login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  userCredentials = { username: '', password: '' };

  constructor(private router: Router, private http: HttpClient) {}

  onUserLogin() {
    // Send user credentials to the server for authentication
    this.http.post<any>('http://localhost:3000/api/login', this.userCredentials)
      .subscribe(
        (response) => {
          // If authentication is successful, navigate to the user dashboard
          this.router.navigate(['/user-dash']);
        },
        (error) => {
          // If authentication fails, show an alert or handle the error appropriately
          alert('Invalid credentials. Please try again.');
        }
      );
  }
}
