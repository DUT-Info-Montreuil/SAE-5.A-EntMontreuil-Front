import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
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

  getRessourceByIdTraining(idTraining: number): Observable<Ressource[]> {
    return this.http.get<Ressource[]>(
      `${this.apiUrl}/resources/training/${idTraining}`,
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

  createRessource(resourceData: Ressource): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/resources`,
      resourceData,
      this.httpOptions
    );
  }

  getRessourceByRessourceTraining(
    idRessource: number
  ): Observable<Ressource[]> {
    return this.http
      .get<Ressource>(
        `${this.apiUrl}/resources/${idRessource}`,
        this.httpOptions
      )
      .pipe(
        switchMap((ressource) => {
          return this.getRessourceByIdTraining(ressource.id_Training);
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