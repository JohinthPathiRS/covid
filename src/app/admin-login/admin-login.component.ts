// admin-login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  adminCredentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  onAdminLogin() {
    console.log(this.adminCredentials);
    // Assuming some logic to validate admin credentials
    if (this.adminCredentials.username === 'johinth' && this.adminCredentials.password === 'johinthking') {
      // Redirect to admin-dashboard upon successful login
      this.router.navigate(['/admin-dash']);
    } else {
      // Handle invalid login, e.g., display an error message
      console.error('Invalid admin credentials');
    }
  }
}
