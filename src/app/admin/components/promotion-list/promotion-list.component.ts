import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Degree } from '../../models/degree.model';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Promotion } from '../../models/promotion.model';
import { PromotionsService } from 'src/app/core/services/promotions.service';

@Component({
  selector: 'app-promotion-list',
  templateUrl: './promotion-list.component.html',
  styleUrls: ['./promotion-list.component.scss']
})
export class PromotionListComponent {
  promotions: Promotion[] = [];
  filteredPromotions: Promotion[] = [];
  degrees: Degree[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreatePromotionDialog: boolean = false;
  isLoading: boolean = true;

  constructor(
    private trainingService: TrainingService,
    private degreeService: DegreeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private promotionService : PromotionsService
  ) {}

  ngOnInit(): void {
    this.refreshPromotions();
    this.degreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }

  refreshPromotions(): void {
    this.isLoading = true;

    this.trainingService.getAllPromotions().subscribe((promotions) => {
      // Sort trainings by ID in ascending order
      this.promotions = promotions.sort((a, b) => a.id - b.id);
      this.filteredPromotions = [...this.promotions];

      this.isLoading = false;
      console.log(this.filteredPromotions);
    });
  }

  onSearch(): void {
    if (!this.searchQuery) {
      this.filteredPromotions = this.promotions;
    } else {
      this.filteredPromotions = this.promotions.filter((promotion) =>
      promotion.year
      );
    }
  }

  onDegreeFilter(event: any): void {
    const selectedDegreeId = event.value; // Modifiez ici pour utiliser event.value

    if (selectedDegreeId) {
      this.filteredPromotions = this.promotions.filter(
        (promotion) =>
        promotion.id_Degree.toString() === selectedDegreeId.toString()
      );
    } else {
      // Si aucune formation n'est sélectionnée, afficher tous les parcours
      this.filteredPromotions = [...this.promotions];
    }
  }

  deletePromotion(id: number): void {
    this.isLoading = true;

    this.promotionService.deletePromotion(id).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression réussie',
          detail: 'La promotion a été supprimé avec succès.',
        });
        this.refreshPromotions()
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
              'Impossible de supprimer la promotion car il est référencé dans une autre table.',
          });
        } else {
          console.error('HTTP Error:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail:
              'Une erreur est survenue lors de la suppression de la promotion.',
          });
        }

        this.isLoading = false;
      }
    );
  }

  confirmDelete(promotion: any): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer la promotion « BUT ${promotion.degree_name} ${promotion.level} ${promotion.year} » ?`,
      accept: () => {
        this.deletePromotion(promotion.id);
      },
    });
  }

  showCreatePromotionDialog(): void {
    this.displayCreatePromotionDialog = false;
     // Ajouter un délai de 1 seconde (vous pouvez ajuster la durée)
     setTimeout(() => {
      // Définir displayCreateTrainingDialog sur true après le délai
      this.displayCreatePromotionDialog = true;
    }, 1);
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

