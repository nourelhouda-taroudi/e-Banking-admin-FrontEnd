import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'src/app/core/models/agent';
import { AgentService } from 'src/app/core/services/agent.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private route:ActivatedRoute,private agentService:AgentService,private router:Router) { }
  agents:Agent[]=[];
  agent=new Agent();
  editeAgent:Agent={
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
    pieceIdentite: ''
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((parameterMap) => {
      const id = Number(parameterMap.get('id'));
       this.getAgent(id);
    });
  }
 
  resetAgent() {
    this.editeAgent = {
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
      pieceIdentite: ''
    };
  }
  public getAgent(id:number):void{
    this.agentService.getAgentById(id).subscribe((response:Agent)=>{
      this.agent=response;
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
    );
  }
  public onUpdateAgent(agent : Agent): void {
    this.agentService.updateAgent(agent).subscribe(
      (response: Agent) => {
        console.log(response);
        this.router.navigate([``]);
        //this.getAgents();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public close(){
    this.router.navigate([``]);
  }

}
