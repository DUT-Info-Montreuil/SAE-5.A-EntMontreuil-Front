import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Training } from '../../admin/models/training.model'; // Assumed model for Training
import { response } from '../models/response.model';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Get all trainings
  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(
      this.apiURL + '/trainings',
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

  // Modifiez la méthode addTraining pour envoyer les données au format attendu
  addTraining(training: Training): Observable<any> {
    const requestData = {
      datas: {
        id_Degree:
          typeof training.id_Degree === 'string'
            ? parseInt(training.id_Degree, 10)
            : training.id_Degree,
        name: training.name,
      },
    };

    return this.http.post<any>(
      `${this.apiURL}/trainings`, // Endpoint pour créer un parcours
      requestData, // Utilisez la structure adaptée
      this.httpOptions
    );
  }

  updateTraining(id: number, name: string, id_Degree: number): Observable<any> {
    const payload = {
      datas: {
        name: name,
        id_Degree: id_Degree,
      },
    };

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
}
