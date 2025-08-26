import { Component } from '@angular/core';
import { Auth } from '../../shared/services/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public auth: Auth, public router: Router) {}
  logout() {
    this.auth.logout();
  }
  login() {
    this.auth.login();
  }
  goToAddAppointment() {
    this.router.navigate(['/appointmentAdd']);
  }
}
