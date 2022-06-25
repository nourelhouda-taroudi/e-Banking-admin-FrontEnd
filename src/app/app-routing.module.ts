import { AuthGuard } from './features/auth/guards/auth.guard';
import { AfterAuthGuard } from './features/auth/guards/afterauth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/error/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate:[AfterAuthGuard],
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate:[AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'admin',
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
