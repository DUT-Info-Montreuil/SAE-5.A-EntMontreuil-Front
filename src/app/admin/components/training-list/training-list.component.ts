import { Component, OnInit } from '@angular/core';
import { Training } from '../../models/training.model';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];
  filteredTrainings: Training[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateTrainingDialog: boolean = false; 
  constructor(
    private trainingService: TrainingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
   this.refreshTrainings();
  }

  refreshTrainings(): void {
    this.trainingService.getAllTrainings().subscribe((trainings) => {
      this.trainings = trainings;
      this.filteredTrainings = trainings;
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

  deleteTraining(id: number): void {
    this.trainingService.deleteTraining(id).subscribe(() => {
      this.trainings = this.trainings.filter((training) => training.id !== id);
      this.filteredTrainings = this.filteredTrainings.filter(
        (training) => training.id !== id
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Suppression réussie',
        detail: 'La formation a été supprimée avec succès.',
      });
    });
  }

  confirmDelete(training: Training): void {
    this.confirmationService.confirm({
      message: `Voulez-vous supprimer la formation « ${training.name} » ?`,
      accept: () => {
        this.deleteTraining(training.id);
      },
    });
  }


  startEditing(training: Training): void {
    training.isEditing = true;
    training.updatedName = training.name; // Assuming you have an 'updatedName' property in Training model
  }

  // Implement the stopEditing method (if necessary)
  stopEditing(training: Training): void {
    training.isEditing = false;

    if (training.updatedName !== training.name) {
      // Logic to handle the updated training
      // For example, calling a service to update the training in the backend
      this.trainingService.updateTraining(training.id, { ...training, name: training.updatedName })
        .subscribe(() => {
          training.name = training.updatedName;
          // Add message or handle UI feedback
        });
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
