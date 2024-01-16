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
export class TdService implements OnInit {
  private apiURL = 'https://localhost:5050';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

 
  getTdInfo(idTD: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/td/${idTD}`, this.httpOptions);
  }
}
