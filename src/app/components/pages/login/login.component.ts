import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pwdHide = true;
  loading = false;

  constructor(private authSvc: AuthService, private route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    const userData = this.authSvc.userData$;

    userData.subscribe(user => {
      if(user) {
        this.route.navigate(['/list'])
      }
    });
    
  }

  onLogin(form: UserI) {
    this.loading = true;

    this.authSvc.loginByEmail(form)
      .then(res => {
        this.loading = false;
        this.route.navigate(['/list'])
        
      })
      .catch(err => {
        this.loading = false;
        console.error(err)
      });
  }

}
