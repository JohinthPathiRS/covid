// user-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  vaccines: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchVaccines();
  }

  fetchVaccines(): void {
    this.http.get<any[]>('http://localhost:3000/api/vaccines').subscribe(
      (data) => {
        this.vaccines = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  

  decrementCount(vaccine: any): void {
    
    this.http.put(`http://localhost:3000/api/decrement/${vaccine.id}`, {}).subscribe(
      (response) => {
        console.log('Decrementing count for', vaccine.type);
       
        this.fetchVaccines();
      },
      (error) => {
        console.error('Error decrementing count:', error);
     
      }
    );
  }
}
