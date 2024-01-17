// create-degree.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { Degree } from '../../models/degree.model';

@Component({
  selector: 'app-create-degree',
  templateUrl: './create-degree.component.html',
  styleUrls: ['./create-degree.component.scss'],
})
export class CreateDegreeComponent {
  newDegreeName: string = ''; // Variable pour stocker le nom de la formation
  @Input() display: boolean = true;
  @Output() displayChange = new EventEmitter<boolean>(); // Émetteur d'événement pour mettre à jour la propriété display
  @Output() degreeCreated = new EventEmitter<Degree>(); // Événement pour signaler la création de formation

  constructor(
    private degreeService: DegreeService,
    private messageService: MessageService
  ) {}

  hideDialog() {
    this.display = false;
    this.displayChange.emit(this.display); // Émettre l'événement pour mettre à jour la propriété display dans le composant parent
  }

  createDegree(newDegreeName: string) {
    // Check if the newDegreeName meets the minimum length requirement
    if (this.newDegreeName.length < 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur de validation',
        detail: 'Le nom de la formation est trop court.',
      });
      return; // Stop execution if validation fails
    }

    const degreeData = {
      datas: {
        name: this.newDegreeName,
      },
    };

    this.degreeService.addDegree(degreeData).subscribe(
      (response: any) => {
        this.hideDialog();
        console.log(response);
        const code = response[1];
        const msg = response[0].message;

        // Vérifiez si le code de réponse est inclus dans le JSON et traitez en conséquence
        if (code !== 200 && code !== 201) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur serveur',
            detail: msg, // Utilisez le message d'erreur du JSON
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Création réussie',
            detail: 'La formation a été créée avec succès.',
          });

          const degree: Degree = {
            id: response[0].id,
            name: newDegreeName,
            isEditing: false,
            updatedName: '',
          };

          this.degreeCreated.emit(degree);
        }
      },
      (httpErrorResponse) => {
        // Gérer les erreurs HTTP ici
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail:
            'Une erreur est survenue lors de la création de la formation.',
        });
      }
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