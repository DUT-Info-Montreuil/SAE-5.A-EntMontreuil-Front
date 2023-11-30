import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Training } from "../../admin/models/training.model"; // Assumed model for Training

@Injectable({
    providedIn: "root"
})
export class TrainingService implements OnInit {

    private apiURL = 'https://127.0.0.1:5050';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) { }

    ngOnInit(): void {

    }

    // Get all trainings
    getAllTrainings(): Observable<Training[]> {
        return this.http.get<Training[]>(this.apiURL + '/trainings', this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Get a specific training by ID
    getTraining(id: number): Observable<Training> {
        return this.http.get<Training>(`${this.apiURL}/trainings/${id}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Add a new training
    addTraining(training: Training): Observable<Training> {
        return this.http.post<Training>(this.apiURL + '/trainings', training, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Update a training
    updateTraining(id: number, training: Training): Observable<Training> {
        return this.http.put<Training>(`${this.apiURL}/trainings/${id}`, training, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Delete a training
    deleteTraining(id: number): Observable<{}> {
        return this.http.delete(`${this.apiURL}/trainings/${id}`, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    // Error handling
    private handleError(error: any) {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
