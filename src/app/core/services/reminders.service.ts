import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReminderModel } from '../models/reminders.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private apiUrl = 'https://localhost:5050';

  constructor(private http: HttpClient) {}

  // Fonction pour obtenir le token JWT stocké localement
  private getAuthToken(): string | null {
    return localStorage.getItem('your_jwt_token_key');
  }

  // Création des options pour les requêtes HTTP avec le token JWT
  private createAuthHeaders(): HttpHeaders {
    const authToken = this.getAuthToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });
  }

  getReminderById(id: number): Observable<any> {
    const httpOptions = {
      headers: this.createAuthHeaders(),
    };
    return this.http.get<any>(`${this.apiUrl}/users/reminders/${id}`, httpOptions);
  }

  getAllReminders(): Observable<any[]> {
    const httpOptions = {
      headers: this.createAuthHeaders(),
    };
    return this.http.get<any[]>(`${this.apiUrl}/users/reminders`, httpOptions);
  }

  addReminder(data: ReminderModel): Observable<any[]> {
    const httpOptions = {
      headers: this.createAuthHeaders(),
    };
    return this.http.post<any[]>(`${this.apiUrl}/users/reminders`, data, httpOptions);
  }

  updateReminder(id: number, data: ReminderModel): Observable<ReminderModel> {
    const httpOptions = {
      headers: this.createAuthHeaders(),
    };
    return this.http.put<ReminderModel>(`${this.apiUrl}/users/reminders/${id}`, data, httpOptions);
  }

  deleteReminder(id: number): Observable<any> {
    const httpOptions = {
      headers: this.createAuthHeaders(),
    };
    return this.http.delete<any>(`${this.apiUrl}/users/reminders/${id}`, httpOptions);
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