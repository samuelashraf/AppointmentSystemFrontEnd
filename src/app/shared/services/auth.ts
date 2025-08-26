import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  islogin = signal(false);

  login() {
    this.islogin.set(true);
  }

  logout() {
    this.islogin.set(false);
  }
}
