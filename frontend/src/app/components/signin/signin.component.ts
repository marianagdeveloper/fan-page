import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    // console.log(this.user);
    this.authService.signIn(this.user)
      .subscribe(
        res => {
          console.log(res);

          // Save token in local storage
          localStorage.setItem('token', res.token);

          // Save user id in local storage
          const userId = JSON.parse(atob(res.token.split('.')[1])) // {_id: '63de68991769e3223ceb7677', iat: 1675571686}
          localStorage.setItem('user', userId._id);

          // Re-direct to characters
          this.router.navigate(['/characters'])

        },
        err => {
          console.log(err)
          alert(err.error)
        }
      )
  }

}
