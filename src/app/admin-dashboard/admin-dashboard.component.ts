// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  vaccines: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchVaccines();
  }

  fetchVaccines() {
    this.http.get<any[]>('http://localhost:3000/api/vaccinations')
      .subscribe(
        (data) => {
          this.vaccines = data;
        },
        (error) => {
          console.error('Error fetching vaccines:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }

  deleteVaccination(id: number) {
    this.http.delete(`http://localhost:3000/api/vaccinations/${id}`)
      .subscribe(
        (response) => {
          console.log(response);
          // Refresh the vaccine list after deletion
          this.fetchVaccines();
        },
        (error) => {
          console.error('Error deleting vaccine:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }

  // Add a method to insert a new vaccination record
  insertVaccination() {
    const newVaccine = {
      type: 'New Vaccine Type',
      location: 'New Location',
      count: 50 // Set the initial count as needed
    };

    this.http.post('http://localhost:3000/api/vaccinations', newVaccine)
      .subscribe(
        (response) => {
          console.log(response);
          // Refresh the vaccine list after insertion
          this.fetchVaccines();
        },
        (error) => {
          console.error('Error inserting vaccine:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }
}
