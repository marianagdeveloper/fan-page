import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000'

  constructor(private http: HttpClient, private router: Router) { }

  // Login
  signIn(user: any) {
    return this.http.post<any>(this.URL + '/login', user)
  }

  // Register
  signUp(user: any) {
    return this.http.post<any>(this.URL + '/register', user)
  }

  // Verify login
  loggedIn() {
    return !!localStorage.getItem('token')
  }

  // Get Token
  getToken() {
    return localStorage.getItem('token')
  }

  // Logout
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])
  }

}
