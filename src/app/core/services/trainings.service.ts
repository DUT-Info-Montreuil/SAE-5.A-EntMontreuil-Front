import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Training } from '../../admin/models/training.model'; // Assumed model for Training
import { response } from '../models/response.model';
import { Promotion } from 'src/app/admin/models/promotion.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService implements OnInit {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  // Get all trainings
  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(
      this.apiURL + '/trainings',
      this.httpOptions
    );
  }

  // Get all trainings
  getAllTrainingsGroupBy(): Observable<Training[]> {
    return this.http.get<Training[]>(
      this.apiURL + '/trainings_gb',
      this.httpOptions
    );
  }

  // Get a specific training by ID
  getTraining(id: number): Observable<Training> {
    return this.http.get<Training>(
      `${this.apiURL}/trainings/${id}`,
      this.httpOptions
    );
  }

  addTraining(training: Training): Observable<any> {
    const requestData = {
      datas: {
        name: training.name,
        id_Promotion: training.id_Promotion,
        semester: training.semester,
      },
    };

    return this.http.post<any>(
      `${this.apiURL}/trainings`, // Endpoint pour créer un parcours
      requestData, // Utilisez la structure adaptée
      this.httpOptions
    );
  }

  updateTraining(
    id: number,
    name: string,
    id_Promotion: number,
    semester: number | null
  ): Observable<any> {
    const payload = {
      datas: {
        name: name,
        id_Promotion: id_Promotion,
        semester: semester,
      },
    };
    console.log(payload);
    return this.http.put<any>(
      `${this.apiURL}/trainings/${id}`,
      payload,
      this.httpOptions
    );
  }

  // Delete a training
  deleteTraining(id: number): Observable<{}> {
    return this.http.delete(`${this.apiURL}/trainings/${id}`, this.httpOptions);
  }

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(
      `${this.apiURL}/promotions`,
      this.httpOptions
    );
  }

  getTDsByTrainingId(idTraining: number): Observable<any> {
    return this.http.get<any>(
      `${this.apiURL}/td/training/${idTraining}`,
      this.httpOptions
    );
  }
  getTpsByTDID(idTD: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/td/tp/${idTD}`, this.httpOptions);
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