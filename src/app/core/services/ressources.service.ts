import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ressource } from 'src/app/admin/models/ressource.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RessourceService {
  private apiUrl = 'api/resources'; // URL de l'API des ressources

  constructor(private http: HttpClient) {}

  // Méthodes pour récupérer, ajouter, mettre à jour, supprimer des ressources...
}
