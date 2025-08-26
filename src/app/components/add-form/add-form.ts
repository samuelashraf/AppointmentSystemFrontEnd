import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Appointment } from '../../shared/services/appointment';
import { AppointmentStatus, IAppointment } from '../../Models/iappointment';

@Component({
  selector: 'app-add-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css',
})
export class AddForm {
  appointmentForm;
  statusOptions: string[] = ['Scheduled', 'Completed', 'Cancelled'];

  constructor(
    private fb: FormBuilder,
    private appointmentService: Appointment
  ) {
    this.appointmentForm = this.fb.group({
      id: [''],
      customerName: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.futureDateValidator]],
      status: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const formValue = this.appointmentForm.value;
      const appointment: IAppointment = {
        id: formValue.id ? Number(formValue.id) : 0,
        customerName: formValue.customerName ?? '',
        appointmentDate: formValue.appointmentDate
          ? new Date(formValue.appointmentDate)
          : new Date(),
        status: formValue.status as unknown as AppointmentStatus,
        notes: formValue.notes ?? undefined,
      };
      this.appointmentService.createAppointment(appointment).subscribe({
        next: (data) => {
          alert('Appointment created successfully');
        },
        error: (err) => {
          if (typeof err.error === 'string') {
            alert('Error updating appointment: ' + err.error);
          } else if (err.error?.message) {
            alert('Error updating appointment: ' + err.error.message);
          } else {
            alert('Unexpected error occurred.');
          }
        },
      });
    }
  }
  futureDateValidator(control: any) {
    let selectedDate = new Date(control.value);
    let currentDate = new Date();
    if (selectedDate <= currentDate) {
      return { invalidDate: true };
    }
    return null;
  }
}
