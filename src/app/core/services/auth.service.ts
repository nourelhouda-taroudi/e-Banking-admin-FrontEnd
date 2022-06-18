import { Observable } from 'rxjs';
import { Admin } from './../models/admin';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  Url="http://localhost:8090/api/auth/"
  constructor(private readonly http: HttpClient) {}
  login(Data : any) : Observable<any>{
    console.log({Data});
    
    return this.http.post<any>(this.Url + "signin",Data);
}


Logout(){
  window.localStorage.clear();
  window.location.reload();
}


isLoggedIn() {
  if(localStorage.getItem('token')==null){
    return false;
  }else return true;
}



getCurrentUser():Observable<Admin>{
  return this.http.get<Admin>(this.Url+"current");
}
}
