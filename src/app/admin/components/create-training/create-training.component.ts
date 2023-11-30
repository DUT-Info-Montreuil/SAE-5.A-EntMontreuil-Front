// create-training.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { Training } from '../../models/training.model';
import { Degree } from '../../models/degree.model';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.scss'],
})
export class CreateTrainingComponent implements OnInit {
  @Input() displayCreateTrainingDialog: boolean = false;
  @Input() degrees: Degree[] = [];
  @Output() trainingCreated: EventEmitter<Training> =
    new EventEmitter<Training>();

  newTrainingName: string = '';
  selectedDegreeId!: number;

  constructor(
    private trainingService: TrainingService,
    private degreeService: DegreeService,
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
    return !!this.newTrainingName.trim() && !!this.selectedDegreeId;
  }

  createTraining(): void {
    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez saisir un nom de parcours et sélectionner un degré.',
      });
      return; // Sortez de la fonction si le formulaire n'est pas valide
    }

    let training: Training = {
      name: this.newTrainingName.trim(),
      id_Degree: this.selectedDegreeId!,
      id: 0,
      degree_name: '',
      isEditing: false,
      updatedName: '',
      updatedDegreeId: 0,
    };

    this.trainingService.addTraining(training).subscribe(
      (response) => {
        console.log(response);
        if (response[1] !== 200) {
          this.messageService.add({
            severity: 'error', // Définissez la gravité sur 'error' pour un toast d'erreur
            summary: 'Erreur', // Résumé du toast
            detail: response[0].message, // Détails du toast
          });
        } else {
          this.messageService.add({
            severity: 'success', // Définissez la gravité sur 'success' pour un toast de succès
            summary: 'Succès', // Résumé du toast
            detail: response[0].message, // Détails du toast
          });
          training.id = response[0].id;
          const selectedDegreeId = parseInt(
            this.selectedDegreeId.toString(),
            10
          );

          let selectedDegreeName = ''; // Initialisez une variable pour stocker le nom du degré

          for (let i = 0; i < this.degrees.length; i++) {
            if (this.degrees[i].id === selectedDegreeId) {
              selectedDegreeName = this.degrees[i].name;
              break; // Sortez de la boucle dès que le degré est trouvé
            }
          }

          training.degree_name = selectedDegreeName;

          this.trainingCreated.emit(training);
          console.log(training);
          this.displayCreateTrainingDialog = false;
        }
      },
      (error) => {
        // Handle error, e.g., show an error toast
      }
    );
  }
}
