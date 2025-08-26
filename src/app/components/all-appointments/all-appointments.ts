import { Component, OnInit } from '@angular/core';
import { IAppointment } from '../../Models/iappointment';
import { Appointment } from '../../shared/services/appointment';
import { CommonModule } from '@angular/common';
import { AppointmentCard } from '../appointment-card/appointment-card';

@Component({
  selector: 'app-all-appointments',
  imports: [CommonModule, AppointmentCard],
  templateUrl: './all-appointments.html',
  styleUrl: './all-appointments.css',
})
export class AllAppointments implements OnInit {
  appointments: IAppointment[] = [];
  constructor(private appointmentService: Appointment) {}

  ngOnInit() {
    this.LoadingAppointments();
  }
  LoadingAppointments() {
    this.appointmentService.getAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
      },
      error: (err) => {
        console.error('Error fetching appointments', err);
      },
    });
  }
}
