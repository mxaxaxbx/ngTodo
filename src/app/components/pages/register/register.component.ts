import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user$: UserI;
  matcher = new MyErrorStateMatcher();
  loading = false;

  constructor(private authSvc: AuthService, private router: Router) { }

  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    password2: new FormControl('')
  }, {validators: this.checkPassword})

  ngOnInit(): void {
  }

  registerUser(form: any) {
    this.loading = true;

    const userObj = {
      ...this.user$,
      email: form.email,
      password: form.password1
    }

    this.authSvc.registerUser(userObj)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/login']);

      }).catch(err => {
        this.loading = false;
        console.error(err);
        
      });
    
  }

  checkPassword(group: FormGroup) {
    let pass1 = group.get('password1').value;
    let pass2 = group.get('password2').value;

    return pass1 === pass2 ? null: {notSame: true}
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
