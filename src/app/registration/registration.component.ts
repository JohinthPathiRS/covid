// registration.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  registerUser() {
   
    this.http.post('http://localhost:3000/api/register', this.user)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.router.navigate(['/user-login']);
         
        },
        (error) => {
          console.error(error);
       
        }
      );
  }
}
