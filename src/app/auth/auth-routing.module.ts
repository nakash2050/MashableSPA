import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    data: {
      breadcrumb: 'Login',
      status: false
    },
  },
  {
    path: '',
    data: {
      title: 'Authentication',
      status: false
    },
    children: [
      {
        path: 'login',
        data: {
          breadcrumb: 'Login'
        },
        loadChildren: () => import('./login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
      },
      {
        path: 'registration',
        data: {
          breadcrumb: 'Registration'
        },
        loadChildren: () => import('./registration/basic-reg/basic-reg.module').then(m => m.BasicRegModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
