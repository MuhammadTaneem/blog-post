import { AuthService } from './../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: any;
  userSubscribe: any;
  uid: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSubscribe = this.route.data.subscribe((data) => {
      this.user = data.data[0];
    });
    this.uid = this.authService.getUid();
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }
}
