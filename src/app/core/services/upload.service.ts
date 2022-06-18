import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8090';
  constructor(private http: HttpClient) { }
  upload(file: File): Observable<{filename:string}> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    return this.http.post<{filename:string}>(`${this.baseUrl}/image/upload`,formData)
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
  
}
