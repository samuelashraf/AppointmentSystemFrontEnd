import { Routes } from '@angular/router';
import { AllAppointments } from './components/all-appointments/all-appointments';
import { NotFound } from './components/not-found/not-found';
import { AppointmentDetails } from './components/appointment-details/appointment-details';
import { AddForm } from './components/add-form/add-form';

export const routes: Routes = [
  { path: 'appointments', component: AllAppointments },
  { path: 'appointmentsDetails/:id', component: AppointmentDetails },
  { path: 'appointmentAdd', component: AddForm },
  { path: '', redirectTo: '/appointments', pathMatch: 'full' },
  { path: '**', component: NotFound },
];
