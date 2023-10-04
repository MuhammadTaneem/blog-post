import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset-cofirm',
  templateUrl: './reset-cofirm.component.html',
  styleUrls: ['./reset-cofirm.component.css'],
})
export class ResetCofirmComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  uid: any;
  token: any;
  hide = true;
  loading = false;
  ngOnInit(): void {
    this.loadData();
    this.authService.isLoading().subscribe((a) => {
      this.loading = a;
    });
  }
  loadData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('uid') && paramMap.has('token')) {
        this.uid = paramMap.get('uid');
        this.token = paramMap.get('token');
      }
    });
  }

  passForm = new FormGroup({
    new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    re_new_password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    this.loading = true;
    this.authService.resetPasswordConfrim(
      this.uid,
      this.token,
      this.passForm.value['new_password'],
      this.passForm.value['re_new_password']
    );
  }
}
