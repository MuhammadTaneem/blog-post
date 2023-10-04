import { PostService } from './../post.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdetailsResolver implements Resolve<boolean> {
  id: any;
  post: any = [];

  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    if (route.paramMap.has('id')) {
      this.id = route.paramMap.get('id');
    }
    return forkJoin([
      this.postService.getpost(this.id),
      this.postService.getiallmage(this.id),
      this.postService.getComments(this.id),
    ]);
  }
}
