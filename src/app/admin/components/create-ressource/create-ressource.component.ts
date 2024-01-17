import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { Ressource } from '../../models/ressource.model';
import { Training } from '../../models/training.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-ressource',
  templateUrl: './create-ressource.component.html',
  styleUrls: ['./create-ressource.component.scss'],
})
export class CreateRessourceComponent implements OnInit {
  @Input() displayCreateRessourceDialog: boolean = false;
  @Input() trainings: Training[] = [];
  @Output() ressourceCreated: EventEmitter<Ressource> =
    new EventEmitter<Ressource>();

  newRessourceName: string = '';
  selectedTrainingId!: number;
  ressourceColor: string = '';
  loading: boolean = false;

  constructor(
    private ressourceService: RessourceService,
    private trainingService: TrainingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.showCreateRessourceDialog();
  }

  showCreateRessourceDialog(): void {
    this.displayCreateRessourceDialog = true;
  }

  closeCreateRessourceDialog(): void {
    this.displayCreateRessourceDialog = false;
  }

  isFormValid(): boolean {
    return (
      !!this.newRessourceName.trim() &&
      !!this.selectedTrainingId &&
      !!this.ressourceColor.trim()
    );
  }

  createRessource(): void {
    this.loading = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez saisir tous les champs requis pour la ressource.',
      });

      this.loading = false;
      return;
    }

    let ressource = new Ressource(
      0, // ID temporaire
      this.newRessourceName.trim(),
      this.selectedTrainingId,
      this.ressourceColor.trim(),
      false, // is_editing
      '', // 'training_name' sera mis à jour après la création
      0 // 'training_semester'
    );

    this.ressourceService.createRessource(ressource).subscribe({
      next: (createdRessource) => {
        // Mettre à jour l'ID de la ressource
        ressource.id = createdRessource.id;
        const ressourceTrainingId = Number(ressource.id_Training);
        const training = this.trainings.find(
          (t) => t.id === ressourceTrainingId
        );
        if (training) ressource.training_name = training?.name;
        this.ressourceCreated.emit(ressource);
        this.resetForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Ressource créée avec succès.',
        });
      },
      error: (error) => {
        // Gérer l'erreur
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'erreur',
          detail: error.error.message,
        });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.closeCreateRessourceDialog();
      },
    });
  }

  private resetForm(): void {
    this.newRessourceName = '';
    this.selectedTrainingId =
      this.trainings.length > 0 ? this.trainings[0].id : 0;
    this.ressourceColor = '';
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