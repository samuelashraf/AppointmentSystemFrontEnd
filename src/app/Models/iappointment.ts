export interface IAppointment {
  id: number;
  customerName: string;
  appointmentDate: Date;
  status: AppointmentStatus;
  notes?: string;
}
export enum AppointmentStatus {
  Scheduled,
  Completed,
  Canceled,
}
