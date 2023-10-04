import { ResetCofirmComponent } from './auth/reset-cofirm/reset-cofirm.component';
import { ProfileResolver } from './resolver/profile.resolver';
import { ProfileComponent } from './profile/profile.component';
import { PostlistResolver } from './resolver/postlist.resolver';
import { PdetailsResolver } from './resolver/pdetails.resolver';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { ResetComponent } from './auth/reset/reset.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepassComponent } from './auth/changepass/changepass.component';
import { AuthGuard } from './auth/auth.guard';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ActivateUserComponent } from './auth/activate-user/activate-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
  {
    path: 'home',
    component: PostListComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: PostlistResolver,
    },
  },
  {
    path: 'postedit/:id',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: PdetailsResolver,
    },
  },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: PdetailsResolver,
    },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: ProfileResolver,
    },
  },
  {
    path: 'editprofile/:id',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: ProfileResolver,
    },
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetComponent },
  {
    path: 'password/reset/confirm/:uid/:token',
    component: ResetCofirmComponent,
  },
  {
    path: 'activate/:uid/:token',
    component: ActivateUserComponent,
  },

  {
    path: 'pass-change',
    component: ChangepassComponent,
    canActivate: [AuthGuard],
  },
  { path: 'pass-reset', component: ChangepassComponent },
  { path: '**', component: PostListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
