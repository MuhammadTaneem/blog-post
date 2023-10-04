import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.css'],
})
export class ActivateUserComponent implements OnInit {
  // [x: string]: any;

  uid: any;
  token: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('uid') && paramMap.has('token')) {
        this.uid = paramMap.get('uid');
        this.token = paramMap.get('token');
      }
    });
  }
  onConfirm() {
    this.authService.userActivation(this.uid, this.token);
  }
}
