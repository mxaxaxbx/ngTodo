import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileI } from '../models/file.interface';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.default.User>;
  private filePath: string;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.userData$ = afAuth.authState;
  }

  loginByEmail(user: UserI) {
    const {email, password} = user;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut();
  }

  registerUser(user: UserI) {
    const {email, password} = user;
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  preSaveUserProfile(user: UserI, image?: FileI): void {
    if(image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  private uploadImage (user: UserI, image: FileI): void {
    this.filePath = `images/${image.name}`;

    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }

  private saveUserProfile (user) {
    const u = this.afAuth.currentUser;

    u.then(userData => {
      userData.updateProfile(user);
      
    }).catch(err => {
      console.error(err);
      
    });
  }

}
