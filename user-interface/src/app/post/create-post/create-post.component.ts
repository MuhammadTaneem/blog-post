import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './../../post.service';
import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  locV = false;
  editMode = false;
  postId: any;
  imageList: File[] = [];
  imagePreview: any = [];
  post: any;
  delteimagelist: string[] = [];

  postFrom = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    location: new FormControl(''),
  });

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editFuntion();
  }

  editFuntion() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.postId = paramMap.get('id');

        this.route.data.subscribe((data) => {
          this.post = data.data[0];
          this.post.images = data.data[1];
          this.postFrom.setValue({
            category: this.post.category,
            content: this.post.content,
            location: this.post.location,
          });
          this.imagePreview.push(this.post.images);
        });

        // this.postService.getPost(this.postId)
        // .subscribe((postData)=>{
        //   this.post = postData.post;
        //   this.userId = postData.post.creator;
        //   this.isLoading = false;

        //   this.postFrom.setValue({
        //     title: this.post.title,
        //     content: this.post.content,
        //     image: this.post.image
        //   });

        //   this.imagePreview = this.post.image;

        // });
      } else {
        this.editMode = false;
      }
    });
  }

  pickImage(event: any) {
    // const files: File = event.target.files;
    for (let i = 0; i < event.target.files.length; i++) {
      this.imageList.push(event.target.files[i]);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.imagePreview.push(event.target.result as string);
      };
    }
  }

  deleteImage(id: string, i: number) {
    this.delteimagelist.push(id);
    this.post.images[i] = null;
  }

  p: Post = {
    id: '',
    category: '',
    content: '',
    location: '',
    posted_time: new Date(),
    author: '1',
  };

  onSubmit() {
    if (this.editMode) {
      this.post.category = this.postFrom.value.category;
      this.post.content = this.postFrom.value.content;
      this.post.location = this.postFrom.value.location;
      this.postService.updatePost(
        this.post,
        this.imageList,
        this.delteimagelist
      );
      // this.postService.uploadImage(this.imageList);
    }
    if (!this.editMode) {
      this.p.category = this.postFrom.value.category;
      this.p.content = this.postFrom.value.content;
      this.p.location = this.postFrom.value.location;
      // console.log(this.p);
      // console.log(this.imageList);

      this.postService.createPost(this.p, this.imageList);
      // this.postService.uploadImage(this.imageList);
    }
  }
}
