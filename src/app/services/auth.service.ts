import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);
  private KEY = "USER"
  router = inject(Router);
  constructor() { }


  login(username: string, password: string): Observable<any> {

    var loginInfo = { username: username, password: password };
    return this.http.post("https://localhost:7123/api/Users/Login", loginInfo)
      .pipe(tap((data) => {

        console.log(data);
        localStorage.setItem(this.KEY, JSON.stringify(data));
        return 'success';

      }))

  }


  get isTokenExpired(): boolean {

    var token = this.getToken();

    if (!token) {

      var decodedToken = jwtDecode(token);

      const currentTime = Date.now() / 1000;
      return decodedToken.exp! < currentTime;
    }
    return true;
  }

  getToken() {
    var tokenObj = localStorage.getItem(this.KEY);
    if (tokenObj != null) {
      var obj = JSON.parse(tokenObj);

      return obj.token;

    }
    return null;
  }

  logout() {


    this.router.navigate(['/authentication/login']);
    localStorage.removeItem(this.KEY);


  }


  get isLoggedIn(): boolean {

    return localStorage.getItem(this.KEY) !== null;
  }
}
