import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
          import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
              import('./features/auth/auth.module').then((m) => m.AuthModule),
        
      },
      {
        path: 'auth',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
