import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent implements OnInit {
  isCreated = false;
  loading = false;
  constructor(private authService: AuthService) {}
  resetFrom = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.authService.isCreated().subscribe((a) => {
      this.isCreated = a;
      // console.log(a);
    });
    this.authService.isLoading().subscribe((a) => {
      this.loading = a;
    });
  }
  reset() {
    this.loading = true;

    this.authService.resetPassword(this.resetFrom.value['email']);
  }
}
