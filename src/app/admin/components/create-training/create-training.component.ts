// create-training.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { Training } from '../../models/training.model';
import { Degree } from '../../models/degree.model';

import { MessageService } from 'primeng/api';
import { Promotion } from '../../models/promotion.model';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss'],
})
export class CreateTrainingComponent implements OnInit {
  @Input() displayCreateTrainingDialog: boolean = false;
  @Input() promotions: Promotion[] = [];
  @Output() trainingCreated: EventEmitter<Training> =
    new EventEmitter<Training>();

  loading: boolean = false;
  newTrainingName: string = '';
  selectedPromotionId!: number;
  selectedSemester!: number;
  constructor(
    private trainingService: TrainingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Fetch the list of degrees for the dropdow
    this.showCreateTrainingDialog();
  }

  showCreateTrainingDialog(): void {
    this.displayCreateTrainingDialog = true;
  }

  closeCreateTrainingDialog(): void {
    this.displayCreateTrainingDialog = false;
  }

  isFormValid(): boolean {
    return (
      !!this.newTrainingName.trim() &&
      !!this.selectedPromotionId &&
      !!this.selectedSemester
    );
  }

  createTraining(): void {
    this.loading = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail:
          'Veuillez saisir un nom de parcours et sélectionner une formation.',
      });

      this.loading = false;
      return; // Sortez de la fonction si le formulaire n'est pas valide
    }

    let newTraining = new Training(
      0, // ID sera défini par la réponse de l'API
      this.newTrainingName.trim(),
      this.selectedPromotionId,
      this.selectedSemester
    );
    console.log(newTraining);
    this.trainingService.addTraining(newTraining).subscribe(
      (response) => {
        console.log(response);
        if (response[1] !== 200) {
          this.messageService.add({
            severity: 'error', // Définissez la gravité sur 'error' pour un toast d'erreur
            summary: 'Erreur', // Résumé du toast
            detail: response[0].message, // Détails du toast
          });

          this.loading = false;
        } else {
          this.messageService.add({
            severity: 'success', // Définissez la gravité sur 'success' pour un toast de succès
            summary: 'Succès', // Résumé du toast
            detail: response[0].message, // Détails du toast
          });
          newTraining.id = response[0].id;

          this.trainingCreated.emit(newTraining);
          this.displayCreateTrainingDialog = false;

          this.loading = false;
        }
      },
      (error) => {
        // Handle error, e.g., show an error toast
      }
    );
  }
}
