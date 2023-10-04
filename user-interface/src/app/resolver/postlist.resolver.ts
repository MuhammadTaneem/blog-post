import { PostService } from './../post.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostlistResolver implements Resolve<boolean> {
  s: string = '';
  viewPost: any = [];
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | any {
    this.route.queryParams.subscribe((params) => {
      // console.log(params.s);
      this.s = params.s;
      this.postService.getposts(
        this.s,
        params.page,
        params.page_size,
        params.user
      );
    });

    return new Promise((resolve, reject) => {
      this.postService.PostTracker().subscribe((data) => {
        resolve(data);
        // console.log(data.viewposts, data.count);
        return data.viewposts, data.count;
      });
    });
  }
}
