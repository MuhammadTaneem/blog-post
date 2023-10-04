import { AuthService } from 'src/app/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
})
export class ChangepassComponent implements OnInit {
  constructor(private authService: AuthService) {}
  public isLoading = false;
  hide = true;

  passForm = new FormGroup({
    current_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private from = {
    current_password: '',
    new_password: '',
    re_new_password: '',
  };

  ngOnInit(): void {}
  onSubmit() {
    (this.from.current_password = this.passForm.value['current_password']),
      (this.from.new_password = this.passForm.value['new_password']),
      (this.from.re_new_password = this.passForm.value['re_new_password']),
      this.authService.changePass(this.from);
    this.passForm.reset();
  }
}
