import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';

const routes: Routes = [
  {path: '', component: ContainerAppComponent, children: [
    {path: 'list', loadChildren: () => 
      import('./components/pages/list/list.module').then(m => m.ListModule)
    },
    {
      path: 'edit/:id',
      canActivate: [AuthGuard],
      loadChildren: () => 
        import('./components/pages/edit/edit.module').then(m => m.EditModule),
    },
    {
      path: 'add/task',
      canActivate: [AuthGuard],
      loadChildren: () => 
        import('./components/pages/add/add.module').then(m => m.AddModule),
    },
    {
      path: 'profile',
      canActivate: [AuthGuard],
      loadChildren: () => 
        import('./components/pages/profile/profile.module').then(m => m.ProfileModule),
    },
    {
      path: 'profile/image',
      canActivate: [AuthGuard],
      loadChildren: () => 
        import('./components/pages/profileImage/profileImage.module').then(m => m.ProfileImageModule)
    },
    {
      path: 'profile/edit',
      canActivate: [AuthGuard],
      loadChildren: () => 
        import('./components/pages/profile-edit/profile-edit.module').then(m => m.ProfileEditModule)
    },
    {
      path: 'login',
      loadChildren: () =>
        import('./components/pages/login/login.module').then(m => m.LoginModule),
    },
    {
      path: 'register',
      loadChildren: () => 
        import('./components/pages/register/register.module').then(m => m.RegisterModule),
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    }
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
