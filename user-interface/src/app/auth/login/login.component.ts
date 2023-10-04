import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}
  public isLoading = false;
  public hide = true;
  loginFrom = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit(): void {}

  onSubmit() {
    let email = this.loginFrom.value['email'];
    let pass = this.loginFrom.value['password'];
    this.authService.login(email, pass);
    this.loginFrom.reset();
  }
}
