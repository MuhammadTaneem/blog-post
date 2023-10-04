import { DialogComponent } from './../../dialog/dialog.component';
import { AuthService } from './../../auth.service';
import { PostService } from './../../post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  id: any;
  uid!: string;
  post: any = [];
  isEditComment = false;
  commentForm = new FormGroup({
    comment: new FormControl('', [Validators.required]),
  });
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private snacbar: MatSnackBar,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.id = paramMap.get('id');
        // console.log(this.id);
        this.loadPost();
      }
    });
    this.uid = this.authService.getUid();
  }

  loadPost() {
    // this.postService.getpost(this.id).subscribe((postData) => {
    //   this.post = postData;
    // });
    // this.postService.getiallmage(this.id).subscribe((postImage) => {
    //   this.post.images = postImage;
    // });
    // this.postService.getComments(this.id).subscribe((postComments) => {
    //   this.post.commets = postComments;
    // });
    this.route.data.subscribe((data) => {
      this.post = data.data[0];
      this.post.images = data.data[1];
      this.post.comments = data.data[2];
      // console.log(this.post);
    });
  }

  onComment(post: string) {
    this.postService.newComment(this.commentForm.value.comment, post);
    this.commentForm.reset();
  }
  onDelete(category: string) {
    // this.postService.deletePost(this.id);
    // let snackbarRef: any = this.snacbar.open('post delete  ', ' undo', {
    //   duration: 5000,
    // });
    // snackbarRef.afterDismissed().subscribe(() => {
    //   console.log('after dismissed ');
    // });
    // snackbarRef.onAction().subscribe(() => {
    //   console.log('after action ');
    //   snackbarRef.dismiss();
    // });
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { category: category },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.deletePost(this.id);
        console.log(this.id);
      }
    });
  }
  onDeleteComment(content: string, id: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { category: content },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.postService.deleteComment(id, this.id);
      }
    });
  }
  onUpdateComment(ct: string, comment: any, post: string) {
    comment.content = ct;
    this.postService.updateComment(comment, post);
    this.commentForm.reset();
    this.isEditComment = false;
  }
}
