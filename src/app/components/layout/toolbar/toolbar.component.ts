import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  user$: UserI;

  appName = 'ngTodo';

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private sidenav: SideNavService
  ) { }

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.user$ = user;
    })
  }

  logout(): void {
    this.authSvc.logout();
    window.location.href = '/list'
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

}
