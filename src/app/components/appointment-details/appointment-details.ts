import { Component, OnInit } from '@angular/core';
import { IAppointment } from '../../Models/iappointment';
import { Appointment } from '../../shared/services/appointment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appointment-details',
  imports: [],
  templateUrl: './appointment-details.html',
  styleUrl: './appointment-details.css',
})
export class AppointmentDetails implements OnInit {
  appointment: IAppointment | null = null;
  appointmentId: number | null = null;

  constructor(
    private appointmentService: Appointment,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.getAppointmentId();
    this.LoadingAppointmentDetails();
  }
  getAppointmentId() {
    this.appointmentId = this.route.snapshot.params['id'];
  }

  LoadingAppointmentDetails() {
    if (this.appointmentId) {
      this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
        next: (data) => {
          this.appointment = data;
        },
        error: (err) => {
          console.error('Error fetching appointment details', err);
        },
      });
    }
  }
}
