import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { IAppointment } from '../../Models/iappointment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '../../shared/services/appointment';

@Component({
  selector: 'app-update-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-form.html',
  styleUrl: './update-form.css',
})
export class UpdateForm implements OnChanges {
  @Input() appointment!: IAppointment | null;
  form: FormGroup;
  statusOptions: string[] = ['Scheduled', 'Completed', 'Cancelled'];
  constructor(
    private fb: FormBuilder,
    private appointmentService: Appointment
  ) {
    this.form = this.fb.group({
      id: [''],
      customerName: [''],
      appointmentDate: [''],
      status: [''],
      notes: [''],
    });
  }

  ngOnChanges() {
    if (this.appointment) {
      this.form.patchValue({
        ...this.appointment,
        appointmentDate: this.formatDate(this.appointment.appointmentDate),
      });
    }
  }

  private formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  onSubmit() {
    if (this.form.valid) {
      const updatedAppointment: IAppointment = {
        ...this.appointment,
        ...this.form.value,
        appointmentDate: new Date(this.form.value.appointmentDate),
      };
      this.appointmentService
        .updateAppointment(updatedAppointment.id, updatedAppointment)
        .subscribe({
          next: (data) => {
            alert('Appointment updated successfully');
            // Optionally, close the modal here
            const modal = document.getElementById('updateModal');
            if (modal) {
              let bsModal = (window as any).bootstrap.Modal.getInstance(modal);
              bsModal.hide();
            }
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
}
