import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Degree } from '../../models/degree.model';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
        background-color: white;
      }
    `,
  ],
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  degrees: Degree[] = [];
  promotions: Promotion[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateTrainingDialog: boolean = false;

  isLoading: boolean = true;

  constructor(
    private trainingService: TrainingService,
    private degreeService: DegreeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.refreshTrainings();
    this.degreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data; // Store degrees for dropdown
    });
    this.trainingService.getAllPromotions().subscribe(
      (data) => {
        this.promotions = data.map((promo) => ({
          ...promo,
          uniqueLabel: `BUT${promo.level}:${promo.year} ${promo.degree_name}`,
        }));
        console.log(this.promotions); // Pour vérifier les données
      },
      (error) => {
        console.error('Erreur lors de la récupération des promotions:', error);
      }
    );
  }

  refreshTrainings(): void {
    this.isLoading = true;

    this.trainingService.getAllTrainings().subscribe((trainings) => {
      // Sort trainings by ID in ascending order
      this.trainings = trainings.sort((a, b) => a.id - b.id);
      this.filteredTrainings = [...this.trainings];

      this.isLoading = false;
      console.log(this.filteredTrainings);
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredTrainings = this.trainings;
    } else {
      this.filteredTrainings = this.trainings.filter((training) =>
        training.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  onDegreeFilter(event: any): void {
    const selectedDegreeId = event.value; // Modifiez ici pour utiliser event.value

    if (selectedDegreeId) {
      this.filteredTrainings = this.trainings.filter(
        (training) =>
          training.id_Degree.toString() === selectedDegreeId.toString()
      );
    } else {
      // Si aucune formation n'est sélectionnée, afficher tous les parcours
      this.filteredTrainings = [...this.trainings];
    }
  }

  deleteTraining(id: number): void {
    this.isLoading = true;

    this.trainingService.deleteTraining(id).subscribe(
      (response: any) => {
        console.log(response);
        const code = response[1];
        const msg = response[0].message;

        if (code === 200) {
          // Successful deletion
          this.trainings = this.trainings.filter(
            (training) => training.id !== id
          );
          this.filteredTrainings = this.filteredTrainings.filter(
            (training) => training.id !== id
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Suppression réussie',
            detail: 'Le parcours a été supprimé avec succès.',
          });
        } else {
          if (code === 500) {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                'Impossible de supprimer le parcours car il est référencé dans une autre table.',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: msg,
            });
          }
        }

        this.isLoading = false;
      },
      (error) => {
        // Handle HTTP error
        console.log(error);
        if (error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              'Impossible de supprimer le parcours car il est référencé dans une autre table.',
          });
        } else {
          console.error('HTTP Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              'Une erreur est survenue lors de la suppression du parcours.',
          });
        }

        this.isLoading = false;
      }
    );
  }

  confirmDelete(training: Training): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer le parcours « ${training.name} » ?`,
      accept: () => {
        this.deleteTraining(training.id);
      },
    });
  }

  startEditing(training: Training): void {
    training.isEditing = true;
    training.updatedName = training.name;
    training.updatedDegreeId = training.id_Degree;
    training.updatedPromotionId = training.id_Promotion;
    training.updatedSemester = training.semester;
    training.isLoading = false;
  }
  stopEditing(training: Training): void {
    training.isEditing = false;
    training.isLoading = true;

    // Convertir les valeurs si nécessaire

    const updatedDegreeId =
      typeof training.updatedDegreeId === 'string'
        ? parseInt(training.updatedDegreeId, 10)
        : training.updatedDegreeId;
    const updatedPromotionId =
      typeof training.updatedPromotionId === 'string'
        ? parseInt(training.updatedPromotionId, 10)
        : training.updatedPromotionId;
    const updatedSemester =
      typeof training.updatedSemester === 'string'
        ? parseInt(training.updatedSemester, 10)
        : training.updatedSemester;

    // Vérifiez si des changements ont été apportés avant de lancer l'update
    if (
      training.updatedName !== training.name ||
      updatedDegreeId !== training.id_Degree ||
      updatedPromotionId !== training.id_Promotion ||
      updatedSemester !== training.semester
    ) {
      this.trainingService
        .updateTraining(
          training.id,
          training.updatedName.trim(),
          updatedPromotionId,
          training.updatedSemester
        )
        .subscribe(
          (response) => {
            // Handle success$
            if (response[1] == 200) {
              training.name = training.updatedName;
              training.id_Promotion = updatedPromotionId;
              training.semester = updatedSemester;
              const promotion = this.promotions.find(
                (p) => p.id === training.id_Promotion
              );
              training.promotion_year = promotion ? promotion.year : 0;
              training.degree_name = promotion?.degree_name ?? 'Inconnu';
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: response[0].message,
              });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: response[0].message,
              });
            }

            training.isLoading = false;
          },
          (error) => {
            // Handle error
            training.isLoading = false;
          }
        );
    } else {
      training.isLoading = false;
    }
  }
  showCreateTrainingDialog(): void {
    // Définir displayCreateTrainingDialog sur false
    this.displayCreateTrainingDialog = false;

    // Ajouter un délai de 1 seconde (vous pouvez ajuster la durée)
    setTimeout(() => {
      // Définir displayCreateTrainingDialog sur true après le délai
      this.displayCreateTrainingDialog = true;
    }, 1);
  }
  onTrainingCreated(training: Training): void {
    // Trouver la promotion correspondante
    const promotion = this.promotions.find(
      (p) => p.id === training.id_Promotion
    );

    if (promotion) {
      // Mettre à jour les informations de la promotion dans le parcours
      training.promotion_year = promotion.year; // Mise à jour de l'année de la promotion
      training.degree_name = promotion.degree_name; // Mise à jour du nom de la formation
      training.id_Degree = promotion.id_Degree;
    }

    // Ajouter le parcours à la liste des parcours
    this.trainings.push(training);
    this.filteredTrainings = [...this.trainings];
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