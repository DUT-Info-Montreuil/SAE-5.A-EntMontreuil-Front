import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Degree } from '../../models/degree.model';
import { DegreeService } from 'src/app/core/services/degrees.service';
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  degrees: Degree[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateTrainingDialog: boolean = false;
  constructor(
    private trainingService: TrainingService,
    private degreeService: DegreeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.refreshTrainings();
    this.degreeService.getAllDegrees().subscribe((data) => {
      this.degrees = data; // Store degrees for dropdown
    });
  }

  refreshTrainings(): void {
    this.trainingService.getAllTrainings().subscribe((trainings) => {
      // Sort trainings by ID in ascending order
      this.trainings = trainings.sort((a, b) => a.id - b.id);
      this.filteredTrainings = [...this.trainings];
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
    const selectedDegreeId = event.target.value;

    if (selectedDegreeId) {
      this.filteredTrainings = this.trainings.filter(
        (training) => training.id_Degree.toString() === selectedDegreeId
      );
    } else {
      // If no degree is selected, show all trainings
      this.filteredTrainings = [...this.trainings];
    }
  }

  deleteTraining(id: number): void {
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
  }
  stopEditing(training: Training): void {
    training.isEditing = false;

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
          },
          (error) => {
            // Handle error
          }
        );
    }
  }

  // Define the method to control the dialog
  showCreateTrainingDialog(): void {
    this.displayCreateTrainingDialog = true;
  }

  // Add a method to handle closing the dialog
  closeCreateTrainingDialog(): void {
    this.displayCreateTrainingDialog = false;
  }

  // Method to handle when a new training is created (optional, depending on your logic)
  handleTrainingCreated(): void {
    // Refresh the list of trainings or any other logic after a training is created
    this.refreshTrainings();
  }
}
