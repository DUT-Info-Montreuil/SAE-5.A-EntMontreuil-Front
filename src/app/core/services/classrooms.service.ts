import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Classroom } from '../models/classroom.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService implements OnInit {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(
      this.apiURL + '/classrooms',
      this.httpOptions
    );
  }

  addClassroom(nom:string, capacite:number): Observable<any> {
    return this.http
      .post<Classroom>(this.apiURL + '/classrooms', { datas: {capacity: capacite, name: nom} }, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          console.error(
            'Erreur lors de l\'ajout d\'une salle de classe:',
            error
          );
          return throwError(error);
        })
      );
  }

  deleteClassroom(idClassroom: number): Observable<any> {
    return this.http.delete<any>( `${this.apiURL}/classrooms/${idClassroom}`, this.httpOptions)
    .pipe(
      catchError((error: any) => {
        console.error('Erreur lors de la suppression de la salle de classe:', error);
        return throwError(error);
      })
    );
  }

  updateClassroom(
    id: number,
    updatedClassroom: Classroom
  ): Observable<Classroom> {
    const url = `${this.apiURL}/classrooms/${id}`;
    return this.http
      .put<Classroom>(url, { datas: updatedClassroom }, this.httpOptions)
      .pipe(
        catchError((error: any) => {
          // Gérer les erreurs ici, par exemple, les erreurs de validation
          console.error(
            'Erreur lors de la mise à jour de la salle de classe:',
            error
          );
          return throwError(error);
        })
      );
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