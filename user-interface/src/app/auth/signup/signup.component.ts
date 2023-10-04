import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { User } from '../auth.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  created = false;
  loading = false;
  hide = true;
  constructor(private authService: AuthService) {}

  // id: string;
  // first_name: string;
  // last_name: string;
  // city: string;
  // country: string;
  // email: string;
  // password1: string;
  // password2: string;
  signupFrom = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {
    this.authService.isCreated().subscribe((a) => {
      this.created = a;
    });
    this.authService.isLoading().subscribe((a) => {
      this.loading = a;
    });
  }

  user: User = {
    id: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
    first_name: '',
  };

  onSubmit() {
    this.loading = true;
    this.user.id = this.signupFrom.value['id'];
    this.user.first_name = this.signupFrom.value['first_name'];
    this.user.last_name = this.signupFrom.value['last_name'];
    this.user.email = this.signupFrom.value['email'];
    this.user.password = this.signupFrom.value['password'];
    this.user.re_password = this.signupFrom.value['re_password'];
    this.authService.creatUser(this.user);
  }
  resend() {
    this.loading = true;
    this.authService.resend(this.user.email);
  }
}
