import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageComponent } from './profileImage.component';
import { ProfileImageRoutingModule } from './profile-image-routing.module';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [ProfileImageComponent],
  imports: [
    CommonModule,
    ProfileImageRoutingModule,
    MaterialModule,
  ]
})
export class ProfileImageModule { }
