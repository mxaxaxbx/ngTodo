import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ProfileEditRoutingModule } from './profile-edit-routing.module';
import { ProfileEditComponent } from './profile-edit.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ProfileEditComponent],
  imports: [
    CommonModule,
    ProfileEditRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProfileEditModule { }
