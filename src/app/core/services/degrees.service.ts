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

  constructor(private http: HttpClient) { }

  // Get all degrees
  getAllDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.apiURL + '/degrees', this.httpOptions);
  }

  getAllDegrees_any(): Observable<any[]> {
    return this.http.get<any[]>(this.apiURL + '/degrees', this.httpOptions);
  }

  // Get a specific degree by ID
  getDegree(id: number): Observable<Degree> {
    return this.http.get<Degree>(
      `${this.apiURL}/degrees/${id}`,
      this.httpOptions
    );
  }

  // Add a new degree
  addDegree(degreeData: { datas: { name: string } }): Observable<any[]> {
    return this.http.post<any[]>(
      `${this.apiURL}/degrees`,
      degreeData,
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
/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/