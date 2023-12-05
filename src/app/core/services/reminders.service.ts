import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReminderModel } from '../models/reminders.model';

@Injectable({
  providedIn: 'root',
})
export class ReminderService {
  private apiUrl = 'https://localhost:5050'; // Remplacez par l'URL de base de votre API

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getReminderById(id: number): Observable<ReminderModel> {
    return this.http
      .get<ReminderModel>(`${this.apiUrl}/users/reminders/${id}`, this.httpOptions);
  }

  getAllReminders(): Observable<ReminderModel[]> {
    return this.http.get<ReminderModel[]>(`${this.apiUrl}/users/reminders`, this.httpOptions);
  }

  addReminder(data: ReminderModel): Observable<ReminderModel> {
    return this.http.post<ReminderModel>(`${this.apiUrl}/users/reminders`, data, this.httpOptions);
  }

  updateReminder(id: number, data: ReminderModel): Observable<ReminderModel> {
    return this.http.put<ReminderModel>(`${this.apiUrl}/users/reminders/${id}`, data, this.httpOptions);
  }

  deleteReminder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/reminders/${id}`, this.httpOptions);
  }
}
