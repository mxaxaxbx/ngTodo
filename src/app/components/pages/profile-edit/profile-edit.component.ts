import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  private user$: UserI
  loading = false;

  constructor(private authSvc: AuthService, private router: Router) { }

  profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(userData => {
      this.user$ = userData;
      this.initValuesForm();
    })
  }

  saveProfileName(form: UserI) {
    this.loading = true;

    const userObj = {
      ...this.user$,
      displayName: form.displayName
    }
    this.authSvc.preSaveUserProfile(userObj);

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/profile']);
    }, 1000)
    
  }

  private initValuesForm(): void {
    this.profileForm.patchValue({
      displayName: this.user$.displayName,
    })
  }

}
