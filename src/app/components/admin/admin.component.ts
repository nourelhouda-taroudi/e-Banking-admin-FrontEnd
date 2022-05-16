import { AgentService } from './agent.service';
import { Agent } from './agent';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public agents: Agent[]= [];
  constructor(private agentService: AgentService) { }

  ngOnInit(): void {
    this.getAgents();
  }
  public getAgents():void{
    this.agentService.getAgent().subscribe((response:Agent[])=>{
      this.agents=response;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }

}
