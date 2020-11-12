import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { UserInterfaceService } from 'src/app/services/user-interface.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  showFiller = true;
  user$: UserI;
  
  @ViewChild('sidenav')
  public sidenav: MatSidenav;

  constructor(private sidenavSvc: SideNavService, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.user$ = user;
      
    })
  }

  ngAfterViewInit(): void {
    this.sidenavSvc.setSidenav(this.sidenav);
  }

}
