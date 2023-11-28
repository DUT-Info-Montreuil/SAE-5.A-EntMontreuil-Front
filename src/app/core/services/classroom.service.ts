import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Classroom } from '../models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private apiUrl = 'https://localhost:5050'; // Remplacez par l'URL de base de votre API

  constructor(private http: HttpClient) {}

  getClassroomById(id: number): Observable<Classroom> {
    return this.http
      .get<Classroom[]>(`${this.apiUrl}/classrooms/${id}`)
      .pipe(map((classrooms) => classrooms[0]));
  }
}
