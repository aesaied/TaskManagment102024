import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private KEY = "USER"
  router = inject(Router);
  constructor() { }


  login(username: string) {
    localStorage.setItem(this.KEY, username);
  }

  logout() {


    this.router.navigate(['/authentication/login']);
    localStorage.removeItem(this.KEY);


  }


  get isLoggedIn(): boolean {

    return localStorage.getItem(this.KEY) !== null;
  }
}
