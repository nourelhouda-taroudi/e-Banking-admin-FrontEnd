import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateAgentComponent } from './create-agent/create-agent.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    AdminComponent,
    CreateAgentComponent,
    HomeAdminComponent,
    SearchComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
