import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SidenavComponent } from './components/layout/sidenav/sidenav.component';
import { SideNavService } from './services/side-nav.service';
import { DeleteDialogComponent } from './components/layout/delete-dialog/delete-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent,
    ToolbarComponent,
    SidenavComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent],
})
export class AppModule { }
