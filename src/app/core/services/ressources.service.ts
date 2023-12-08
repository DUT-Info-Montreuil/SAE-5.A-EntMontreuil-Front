import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from 'src/app/admin/models/ressource.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private apiUrl = 'https://localhost:5050'; // URL de l'API des ressources

  constructor(private http: HttpClient) {}

  // Méthodes pour récupérer, ajouter, mettre à jour, supprimer des ressources...
  getRessources(): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(
      this.apiUrl + '/resources',
      this.httpOptions
    );
  }

  deleteRessource(resourceId: number): Observable<any[]> {
    return this.http.delete<any[]>(
      `${this.apiUrl}/resources/${resourceId}`,
      this.httpOptions
    );
  }

  updateRessource(
    resourceId: number,
    resourceData: Ressource
  ): Observable<Ressource> {
    return this.http.put<Ressource>(
      `${this.apiUrl}/resources/${resourceId}`,
      resourceData,
      this.httpOptions
    );
  }
}
