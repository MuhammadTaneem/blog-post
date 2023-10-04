import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post, ViewPost } from './post/post.model';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private http: HttpClient,
    private snacbar: MatSnackBar,
    private router: Router
  ) {}
  BACKEND_URL = environment.apiUrl + 'api/posts/';
  posts: Post[] = [];
  viewPost: any = [];
  updatedPost = new Subject<{ viewposts: any; count: number }>();

  getpost(post: string) {
    return this.http.get<{
      id: string;
      content: string;
      category: string;
      author: string;
      posted_date: Date;
      location: string;
      author_name: string;
    }>(this.BACKEND_URL + 'postlist/' + post);
  }

  // get all posts

  getposts(
    s: string = '',
    page: number = 1,
    page_size: number = 10,
    user: string = ''
  ) {
    const queryParams = `?search=${s}&page=${page}&page_size=${page_size}&user=${user}`;
    if (user) {
      this.http
        .get<{ viewPost: ViewPost[]; results: any; count: number }>(
          this.BACKEND_URL + 'userposts/' + queryParams
        )
        .subscribe((postData) => {
          this.viewPost = postData.results;
          this.loadPostImage(postData.count);
        });
    } else {
      this.http
        .get<{ viewPost: ViewPost[]; results: any; count: number }>(
          this.BACKEND_URL + 'postlist/' + queryParams
        )
        .subscribe((postData) => {
          this.viewPost = postData.results;
          this.loadPostImage(postData.count);
        });
    }
  }

  loadPostImage(count: number) {
    for (let i = 0; i < this.viewPost.length; i++) {
      this.getimages(this.viewPost[i].id, i);
    }
    this.updatedPost.next({ viewposts: this.viewPost, count: count });
  }

  getimages(post: string, i: number) {
    const queryParams = `?post=${post}`;
    this.http
      .get<{}>(this.BACKEND_URL + 'simage/' + queryParams)
      .subscribe((postData) => {
        this.viewPost[i].images = postData;
      });
  }
  getiallmage(post: string) {
    const queryParams = `?post=${post}`;
    return this.http.get<{}>(this.BACKEND_URL + 'image/' + queryParams);
  }

  PostTracker() {
    return this.updatedPost.asObservable();
  }

  // create new post

  createPost(p: Post, imagelist: File[]) {
    this.http
      .post<{ id: string }>(this.BACKEND_URL + 'postlist/', p)
      .subscribe((postData) => {
        this.imageUploader(imagelist, postData.id);
        this.router.navigate(['/']);
        this.snacbar.open(' succesfully create post  ', 'X', {
          duration: 2000,
        });
      });
  }

  updatePost(p: Post, imagelist: File[], list: string[]) {
    this.http
      .put<{ id: string }>(this.BACKEND_URL + 'postlist/' + p.id + '/', p)
      .subscribe((postData) => {
        this.router.navigate(['/']);
        this.snacbar.open(' post updated  ', 'X', { duration: 2000 });
      });
    this.imageUploader(imagelist, p.id);
    this.deleteImages(list, p.id);
  }

  deletePost(post: string) {
    this.http.delete(this.BACKEND_URL + 'postlist/' + post).subscribe((msg) => {
      this.router.navigate(['/']);
      this.snacbar.open(' post deleted ', 'X', { duration: 2000 });
    });
  }

  imageUploader(imageList: File[], post: string) {
    const formData = new FormData();
    formData.append('post', post);
    formData.append('author', '1');

    for (let i = 0; i < imageList.length; i++) {
      formData.append('image', imageList[i]);
      this.http
        .post<{ id: string }>(this.BACKEND_URL + 'image/', formData)
        .subscribe((postData) => {});
    }
  }

  deleteImages(list: string[], post: string) {
    const queryParams = `/?post=${post}`;
    for (let i = 0; i < list.length; i++) {
      this.http
        .delete<{ id: string }>(
          this.BACKEND_URL + 'image/' + list[i] + queryParams
        )
        .subscribe((postData) => {});
    }
  }

  // comment
  newComment(comment: string, post: string) {
    const formData = new FormData();
    formData.append('post', post);
    formData.append('author', '1');
    formData.append('content', comment);
    this.http
      .post<{ id: string }>(this.BACKEND_URL + 'comment/', formData)
      .subscribe((postData) => {
        this.snacbar.open(' Commented ', 'X', { duration: 2000 });
      });
  }

  getComments(post: string) {
    const queryParams = `?post=${post}`;
    return this.http.get<{}>(this.BACKEND_URL + 'comment/' + queryParams);
  }
  deleteComment(id: string, post: string) {
    const queryParams = `?post=${post}`;
    return this.http
      .delete(this.BACKEND_URL + 'comment/' + id + queryParams)
      .subscribe((msg) => {
        this.snacbar.open(' comment deleted ', 'X', { duration: 2000 });
      });
  }
  updateComment(comment: any, post: string) {
    const queryParams = `${comment.id}/?post=${post}`;
    return this.http
      .put(this.BACKEND_URL + 'comment/' + queryParams, comment)
      .subscribe((msg) => {
        this.snacbar.open(' comment updated ', 'X', { duration: 2000 });
      });
  }
}
