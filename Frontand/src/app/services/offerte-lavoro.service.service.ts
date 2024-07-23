import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { offerte_lavoro_entity } from '../entity/offerte_lavoro.entity';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/offerts';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<offerte_lavoro_entity[]> {
    return this.http.get<offerte_lavoro_entity[]>(`${this.apiUrl}/view`);
  }

  addJob(job: offerte_lavoro_entity): Observable<offerte_lavoro_entity> {
    return this.http.post<offerte_lavoro_entity>(`${this.apiUrl}/add`, job);
  }

  deleteJob(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}
