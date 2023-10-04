import { ProfileService } from './../profile.service';
import { AuthService } from 'src/app/auth.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<boolean> {
  id: any;
  post: any = [];

  constructor(private profileService: ProfileService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    if (route.paramMap.has('id')) {
      this.id = route.paramMap.get('id');
      // this.profileService.getProfile(this.id);
      // console.log(route.paramMap.get('id'));
    }

    // const user = this.profileService.getProfile(this.id);
    // console.log(user);

    return this.profileService.getProfile(this.id);

    // return this.profileService.receiveProfile();
  }
}
