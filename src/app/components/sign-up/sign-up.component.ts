import { AgentService } from './../admin/agent.service';
import { Agent } from './../admin/agent';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form:FormGroup=new FormGroup({
    firstName:new FormControl(null,[Validators.required]),
    lastName:new FormControl(null,[Validators.required]),
    typeIdentity:new FormControl(null,[Validators.required]),
    identity:new FormControl(null,[Validators.required]),
    birthday:new FormControl(null),
    adress:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    emailValidation:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required]),
    matricule:new FormControl(null,[Validators.required]),
    patente:new FormControl(null,[Validators.required]),
    description:new FormControl(null,[Validators.required]),
    file:new FormControl(null,[Validators.required])
  })

  constructor(private readonly agentService:AgentService) { }

  ngOnInit(): void {
  }
  createAgent(){
    const {firstName,
      lastName,
      typeIdentity,
      identity,
      birthday,
      adress,
      email,
      phone,
      matricule,
      patente,
      description, 
      file
    }=this.form.value;
     let agent=new Agent();
     agent.nom=lastName;
     agent.prenom=firstName;
     agent.Description=description;
     agent.Immatriculation=matricule;
     agent.Naissance=birthday;
     agent.Patente=patente;
     agent.PieceIdentite=identity,
     agent.image=file;
     agent.telephone=phone;
     agent.email=email;
     agent.cin=typeIdentity;
     agent.adress=adress;
    this.agentService.createAgent(agent).subscribe(
      response=>{
          console.log(response);
      },
      error=>{
          console.log(error);
      }
    );
  }

}
