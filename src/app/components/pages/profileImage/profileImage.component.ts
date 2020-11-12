import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileI } from 'src/app/models/file.interface';

import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profileImage.component.html',
  styleUrls: ['./profileImage.component.css']
})
export class ProfileImageComponent implements OnInit {

  user$: UserI
  profileImage: any;
  uploadImageBtn = false;
  loading = false;
  private image: FileI;

  constructor(
    private authSvc: AuthService,
    private fileSvc: FileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.user$ = user;
      this.setProfileImage();
    })
  }

  setProfileImage(): void {
    this.profileImage = this.user$?.photoURL || 'https://www.materialui.co/materialIcons/action/account_circle_black_192x192.png';
  }

  handleImage(event: any): void {
    const image = event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(image);
    reader.onload = () => {
      this.profileImage = reader.result
      this.uploadImageBtn = true;
      this.image = event.target.files[0];
    }
    
  }

  uploadProfilePhoto() {
    this.loading = true;

    this.fileSvc.uploadUserImage(this.user$, this.image).subscribe(url => {
      this.profileImage = url;
      this.updateProfilePhotoUrl(this.user$, url);
      
    })
    
  }

  private updateProfilePhotoUrl(user: UserI, imageUrl) {
    let userObj = {
      ...user,
      photoURL: imageUrl
    }

    this.authSvc.preSaveUserProfile(userObj);
    this.loading = false;
    this.router.navigate(['/profile']);
  }

}
