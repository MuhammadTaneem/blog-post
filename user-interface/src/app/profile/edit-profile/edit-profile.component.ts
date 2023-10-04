import { HttpClient } from '@angular/common/http';
import { ProfileService } from './../../profile.service';
import { EditComponent } from './../../dialog/edit/edit.component';
import { AuthService } from './../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  user: any;
  userSubscribe: any;
  uid: any;
  imageList: File[] = [];
  imagePreview: any;
  file!: File;
  // imagePreview: any = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userSubscribe = this.route.data.subscribe((data) => {
      this.user = data.data[0];
      // console.log(data.data[0]);
    });
    this.uid = this.authService.getUid();
  }

  pickImage(event: any) {
    this.file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', this.file);
    this.profileService.updateUser(this.uid, formData);

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.imagePreview = event.target.result as string;
    };
  }

  edit(field: string, content: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { field: field, content: content },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.postService.deletePost(this.id);
        // console.log(result);
        if (field == 'Bio') {
          this.user.bio = result;
          const userObj = { bio: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'First Name') {
          this.user.first_name = result;
          const userObj = { first_name: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Last Name') {
          this.user.last_name = result;
          const userObj = { last_name: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Education') {
          this.user.study = result;
          const userObj = { study: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Work') {
          this.user.work = result;
          const userObj = { work: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Research') {
          this.user.research = result;
          const userObj = { research: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Country') {
          this.user.country = result;
          const userObj = { country: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'City') {
          this.user.city = result;
          const userObj = { city: result };
          this.profileService.updateUser(this.uid, userObj);
        }
        if (field == 'Email') {
          const newEmail = result;
          const dialogRef = this.dialog.open(EditComponent, {
            data: { field: 'Password', content: '' },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
              this.authService.changeEmail(newEmail, result);
            }
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscribe.unsubscribe();
  }
}
