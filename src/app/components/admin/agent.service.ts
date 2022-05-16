import { Agent } from './agent';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
 private apiServiceUrl ='http://localhost:8090';

  constructor(private http:HttpClient) { }

  public getAgent():Observable<Agent[]>{
    return this.http.get<Agent[]>(`${this.apiServiceUrl}/Agent/allagents`)
  }

  public gaddAgent(agent:Agent):Observable<Agent>{
    return this.http.post<Agent>(`${this.apiServiceUrl}/Agent/addagent`,agent)
  }

  public updateAgent(agent:Agent):Observable<Agent>{
    return this.http.put<Agent>(`${this.apiServiceUrl}/Agent/updateagent`,agent)
  }

  public deleteAgent(agentID:number):Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/Agent/deleteagent/${agentID}`)
  }
}
