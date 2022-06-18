import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = 'http://localhost:8090';
  constructor(private http: HttpClient) { }
  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/image/upload`,formData)
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
