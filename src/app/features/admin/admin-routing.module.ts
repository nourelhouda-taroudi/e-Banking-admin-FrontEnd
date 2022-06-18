

import { HomeAdminComponent } from './home-admin/home-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'create-agent', component: CreateAgentComponent },
  { path: 'update/:id', component: UpdateComponent },
  {path:'',component:HomeAdminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
