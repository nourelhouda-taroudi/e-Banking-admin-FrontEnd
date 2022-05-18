import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';



const routes: Routes = [
  { 
    path: '' , 
    component:AdminComponent

  },
  {
      path:'add-agent',
      component:SignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
