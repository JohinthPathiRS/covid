import { Component } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  bookingDetails = { type: '', location: '', count: 0 };

  onSubmitBooking() {
   
    console.log('Booking submitted:', this.bookingDetails);
   
  }
}
