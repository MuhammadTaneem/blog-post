import { PostService } from './../../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public viewPost: any = [];
  postSubcribe: any;
  public length = 0;
  public pageSize = 10;
  public pageSizeOptions = [10, 15, 20, 30];
  public currentPage = 1;
  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postSubcribe = this.route.data.subscribe((data) => {
      this.viewPost = data.data.viewposts;
      this.length = data.data.count;
      // console.log(data.data.viewposts, data.data.count);
    });
    this.postSubcribe = this.postService.PostTracker().subscribe((data) => {
      this.viewPost = data.viewposts;
      this.length = data.count;
      // console.log(data);
    });
  }
  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.pageSize = pageData.pageSize;
    // this.postService.getPosts(this.pageSize, this.currentPage);
    const queryParams = this.router.createUrlTree(['/home'], {
      queryParams: { page: pageData.pageIndex + 1, page_size: this.pageSize },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });

    this.router.navigateByUrl(queryParams);
  }
  // loadData() {
  //   this.postSubcribe = this.route.data.pipe(
  //     map((data) => {
  //       this.viewPost = data.data;
  //       console.log(this.viewPost);
  //     })
  //   );
  // }

  // getPosts() {
  //   this.postService.getposts();
  //   this.postSubcribe = this.postService
  //     .PostTracker()
  //     .subscribe((arg: { viewposts: ViewPost[] }) => {
  //       this.viewPost = arg.viewposts;
  //       // console.log(this.viewPost);
  //     });
  // }

  ngOnDestroy(): void {
    this.postSubcribe.unsubscribe();
  }
}
