import { PostService } from './post.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ChangepassComponent } from './auth/changepass/changepass.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { ProfileComponent } from './profile/profile.component';
import { DialogComponent } from './dialog/dialog.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { EditComponent } from './dialog/edit/edit.component';
import { ResetComponent } from './auth/reset/reset.component';
import { ResetCofirmComponent } from './auth/reset-cofirm/reset-cofirm.component';
import { ActivateUserComponent } from './auth/activate-user/activate-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreatePostComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ChangepassComponent,
    PostDetailComponent,
    ProfileComponent,
    DialogComponent,
    EditProfileComponent,
    EditComponent,
    ResetComponent,
    ResetCofirmComponent,
    ActivateUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    PostService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
