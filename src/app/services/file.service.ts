import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { FileI } from '../models/file.interface';
import { UserI } from '../models/user.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private filePath: string;
  private urlImage: string

  constructor(
    private storage: AngularFireStorage
  ) { }

  uploadUserImage(user: UserI, image: FileI) {
    const imageExt = image.name.split('.').pop()
    this.filePath = `images/users/${user.uid}/photoUrl/${user.uid}.${imageExt}`;

    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.urlImage = urlImage;
          })
        })
      );

    return fileRef.getDownloadURL().pipe(map(a => {return a}));
    
  }
}
