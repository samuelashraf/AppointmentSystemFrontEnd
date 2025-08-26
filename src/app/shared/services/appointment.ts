import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAppointment } from '../../Models/iappointment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Appointment {
  pathUrl: string = `${environment.pathUrl}Appointment/`;
  constructor(private _http: HttpClient) {}
  getAppointments() {
    return this._http.get<IAppointment[]>(`${this.pathUrl}GetAllAppointment`);
  }
  getAppointmentById(id: number) {
    return this._http.get<IAppointment>(
      `${this.pathUrl}GetAppointmentById/${id}`
    );
  }
  createAppointment(appointment: IAppointment) {
    return this._http
      .post<IAppointment>(`${this.pathUrl}CreateAppointment`, appointment)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  updateAppointment(id: number, appointment: IAppointment) {
    return this._http
      .put<IAppointment>(`${this.pathUrl}UpdateAppointment/${id}`, appointment)
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  deleteAppointment(id: number) {
    return this._http.delete<IAppointment>(
      `${this.pathUrl}DeleteAppointment/${id}`
    );
  }
}
