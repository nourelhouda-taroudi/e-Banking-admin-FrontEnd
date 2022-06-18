import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agent } from './../models/agent';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private apiServiceUrl = 'http://localhost:8090';

  constructor(private http: HttpClient) {}

  public getAgent(): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.apiServiceUrl}/agent/getAll`);
  }

  public addAgent(agent: Agent,): Observable<Agent> {
    return this.http.post<Agent>(`${this.apiServiceUrl}/agent/create`, agent);
  }

//   public updateAgent(agent: Agent): Observable<Agent> {
//     return this.http.put<Agent>(
//       `${this.apiServiceUrl}/agent/update/${agent.id}`,
//  agent);
//   }
public updateAgent(agent : Agent) : Observable<Agent>{
  return this.http.put<Agent>(`${this.apiServiceUrl}/agent/update/${agent.id}`,agent);
}

  public deleteAgent(agentID: number) {
    return this.http.delete<void>(
      `${this.apiServiceUrl}/agent/${agentID}`
    );
  }
  public createAgent(agent: Agent): Observable<Agent> {
    return this.http.post<Agent>(
      `${this.apiServiceUrl}/Agent/createagent`,
      agent
    );
  }
 getAgentById(id: number): Observable<Agent> {
  return this.http.get<Agent>(`http://localhost:8090/agent/${id}`);
  }
}
