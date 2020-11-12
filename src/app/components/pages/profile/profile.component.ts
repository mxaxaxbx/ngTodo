import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$: UserI

  constructor(
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.user$ = user;
      console.log(user.photoURL);
      
      
    })
  }

  profileImage(): string {
    return this.user$?.photoURL || 'https://www.materialui.co/materialIcons/action/account_circle_black_192x192.png'
  }

}
