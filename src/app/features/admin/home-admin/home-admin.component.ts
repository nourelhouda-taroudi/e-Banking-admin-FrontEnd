import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { AgentService } from './../../../core/services/agent.service';
import { Agent } from './../../../core/models/agent';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent implements OnInit {
  public agents: Agent[] = [];
  public updateAgent: Agent | undefined;
  user: string | null = '';
  agent = new Agent();
  public deleteAgent!: Agent;
  searchText: string = '';
  constructor(
    private agentService: AgentService,
    private readonly jwtService: JwtService,
    public router: Router
  ) {}
  Agentlist: Agent = {
    id: 0,
    username: '',
    email: '',
    password: '',
    birthday: new Date(),
    idcard: '',
    phoneNumber: '',
    address: '',
    immatriculation: '',
    patente: '',
    description: '',
    image: '',
    pieceIdentite: '',
  };
  async ngOnInit() {
    this.getAgents();
    this.getUser();
  }
  public getAgents(): void {
    this.agentService.getAgent().subscribe(
      (response: Agent[]) => {
        this.agents = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public deletAgent(id: number) {
    console.log(id);
    this.agentService.deleteAgent(id).subscribe(
      (response: void) => {
        console.log(response);
        this.getAgents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  editeAgent(agent: any) {
    this.Agentlist = agent;
    this.router.navigate(['update', this.Agentlist.id]);
  }
  logout() {
    this.jwtService.remove();
  }

  onSearchTextEntered(searchedValue: string) {
    this.searchText = searchedValue;
    console.log(this.searchText);
  }
  getUser() {
    this.user = this.jwtService.getUsername();
  }
}
