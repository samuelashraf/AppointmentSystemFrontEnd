import { Component, Input, OnInit } from '@angular/core';
import { IAppointment } from '../../Models/iappointment';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../shared/services/appointment';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../shared/services/auth';
import { UpdateForm } from '../update-form/update-form';

@Component({
  selector: 'app-appointment-card',
  imports: [CommonModule, UpdateForm],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.css',
})
export class AppointmentCard {
  @Input() appointment!: IAppointment;
  selectedAppointment?: IAppointment;
  constructor(
    private appointmentService: Appointment,
    private router: Router,
    public auth: Auth
  ) {}

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe({
        next: (data) => {
          alert('Appointment deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting appointment', err);
          alert('Failed to delete appointment. Please try again later.');
        },
      });
    }
  }
  openUpdateModal(appointment: any) {
    this.selectedAppointment = appointment;
    const modal = document.getElementById('updateModal');
    if (modal) {
      let bsModal = new (window as any).bootstrap.Modal(modal);
      bsModal.show();
    }
  }
  goToDetails(id: number) {
    this.router.navigate(['/appointmentsDetails', id]);
  }
}
