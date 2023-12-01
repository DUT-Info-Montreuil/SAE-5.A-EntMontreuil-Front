import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Degree } from '../../models/degree.model';
import { DegreeService } from 'src/app/core/services/degrees.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  styles: [
    `
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
            background-color: white;
        }
    `
  ],
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  degrees: Degree[] = [];
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
  ) { }

  ngOnInit(): void {
    this.refreshTrainings();
    this.degreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data; // Store degrees for dropdown
    });
  }

  refreshTrainings(): void {

    this.isLoading = true;

    this.trainingService.getAllTrainings().subscribe((trainings) => {
      // Sort trainings by ID in ascending order
      this.trainings = trainings.sort((a, b) => a.id - b.id);
      this.filteredTrainings = [...this.trainings];

      this.isLoading = false;
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
        (training) => training.id_Degree.toString() === selectedDegreeId.toString()
      );
    } else {
      // Si aucune formation n'est sélectionnée, afficher tous les parcours
      this.filteredTrainings = [...this.trainings];
    }
  }


  deleteTraining(id: number): void {

    this.isLoading = true;

    this.trainingService.deleteTraining(id).subscribe(() => {
      this.trainings = this.trainings.filter((training) => training.id !== id);
      this.filteredTrainings = this.filteredTrainings.filter(
        (training) => training.id !== id
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Suppression réussie',
        detail: 'Le parcours a été supprimée avec succès.',
      });

      this.isLoading = false;
    });
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
    training.isLoading = false;
  }

  stopEditing(training: Training): void {
    training.isEditing = false;
    training.isLoading = true;

    // Convert id_Degree to an integer if it's a string
    const updatedDegreeId =
      typeof training.updatedDegreeId === 'string'
        ? parseInt(training.updatedDegreeId, 10)
        : training.updatedDegreeId;

    if (
      training.updatedName !== training.name ||
      updatedDegreeId !== training.id_Degree
    ) {
      this.trainingService
        .updateTraining(
          training.id,
          training.updatedName.trim(),
          updatedDegreeId
        )
        .subscribe(
          (response) => {
            // Handle success$
            if (response[1] == 200) {
              training.name = training.updatedName;
              training.id_Degree = updatedDegreeId;
              const selectedDegree = this.degrees.find(
                (degree) => degree.id === updatedDegreeId
              );
              if (selectedDegree) {
                training.degree_name = selectedDegree.name;
              }
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
    // Utilisez les données de la formation pour mettre à jour la liste des formations
    this.trainings.push(training); // Ajoutez la nouvelle formation à la liste
    this.filteredTrainings = [...this.trainings]; // Mettez à jour la liste filtrée
  }
}
