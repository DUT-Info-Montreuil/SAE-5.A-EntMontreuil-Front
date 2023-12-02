import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Degree } from '../../admin/models/degree.model'; // Update the path as needed

@Injectable({
  providedIn: 'root',
})
export class DegreeService {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Get all degrees
  getAllDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.apiURL + '/degrees', this.httpOptions);
  }

  // Get a specific degree by ID
  getDegree(id: number): Observable<Degree> {
    return this.http.get<Degree>(
      `${this.apiURL}/degrees/${id}`,
      this.httpOptions
    );
  }

  // Add a new degree
  addDegree(degreeData: { name: string }): Observable<Degree> {
    return this.http.post<Degree>(
      this.apiURL + '/degrees',
      { datas: degreeData },
      this.httpOptions
    );
  }

  // Update a degree
  updateDegree(id: number, degreeData: { name: string }): Observable<Degree> {
    return this.http.put<Degree>(
      `${this.apiURL}/degrees/${id}`,
      { datas: degreeData },
      this.httpOptions
    );
  }

  // Delete a degree
  deleteDegree(id: number): Observable<{}> {
    return this.http.delete(`${this.apiURL}/degrees/${id}`, this.httpOptions);
  }
}
