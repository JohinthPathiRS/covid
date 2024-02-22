// vaccine-form.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent {
  newVaccine = {
    type: '',
    location: '',
    count: 0
  };

  constructor(private http: HttpClient) { }

  insertVaccination() {
    this.http.post('http://localhost:3000/api/vaccinations', this.newVaccine)
      .subscribe(
        (response) => {
          console.log(response);
          // Optionally, you can reset the form after successful insertion
          this.resetForm();
        },
        (error) => {
          console.error('Error inserting vaccine:', error);
          // Handle error, e.g., display an error message to the user
        }
      );
  }

  resetForm() {
    this.newVaccine = {
      type: '',
      location: '',
      count: 0
    };
  }
}
