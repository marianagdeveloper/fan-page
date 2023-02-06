import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  registerUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  })

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signUp() {
    // console.log(this.user);
    this.user = this.registerUserForm.value;

    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);

          // Save token in local storage
          localStorage.setItem('token', res.token);

          // Save user id in local storage
          const userId = JSON.parse(atob(res.token.split('.')[1])) // {_id: '63de68991769e3223ceb7677', iat: 1675571686}
          localStorage.setItem('user', userId._id);

          // Re-direct to profile
          this.router.navigate(['/characters'])

        },
        err => {
          console.log(err)
          alert(err.error)
        }
      )
  }

}
