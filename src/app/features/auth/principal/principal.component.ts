import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor() { }

  public hide : boolean = false;

  public showChoices(){
    this.hide = true;
  }
  ngOnInit() {
  }

}
