import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource.model';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { Training } from '../../models/training.model';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.scss'],
})
export class RessourceListComponent {
  onSearch() {
    throw new Error('Method not implemented.');
  }

  Ressource: Ressource[] = [];
  filteredRessources: Ressource[] = [];
  trainings: Training[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateRessources: boolean = false;

  isLoading: boolean = false;

  constructor(
    private ressourceService: RessourceService,
    private trainingService: TrainingService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRessources();
  }

  loadRessources(): void {
    this.isLoading = true;
    this.ressourceService.getRessources().subscribe(
      (ressources) => {
        console.log(ressources);
        this.Ressource = ressources.map((ressource) => ({
          ...ressource,
          isEditing: false, // Définir isEditing à false pour chaque ressource
        }));
        this.filteredRessources = [...this.Ressource];

        this.trainingService.getAllTrainings().subscribe((trainings) => {
          // Assuming 'trainings' is an array of objects with 'id' and 'name' properties
          this.trainings = trainings.map(
            (t) => new Training(t.id, t.name, 0, 'default')
          );
          console.log(this.trainings);
        });
        this.isLoading = false;
        console.log(this.trainings);
      },
      (error) => {
        // Gérer l'erreur ici

        this.isLoading = false;
      }
    );
  }

  startEditing(ressource: Ressource) {
    ressource.is_editing = true;
    console.log(ressource);
  }

  confirmChanges(ressource: Ressource) {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment modfiier la ressource ${ressource.name}?`,
      accept: () => {
        this.saveChanges(ressource);
      },
    });
  }

  saveChanges(ressource: Ressource) {
    this.ressourceService.updateRessource(ressource.id, ressource).subscribe({
      next: () => {
        console.log('Ressource mise à jour');
        ressource.is_editing = false; // Arrête l'édition après la mise à jour réussie

        // Mise à jour manuelle de la liste locale de ressources
        const index = this.Ressource.findIndex((r) => r.id === ressource.id);
        if (index !== -1) {
          this.Ressource[index] = { ...ressource }; // Mise à jour de la ressource avec les nouvelles données
          this.filteredRessources = [...this.Ressource]; // Mise à jour des ressources filtrées si nécessaire
        }

        // Afficher un message de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Mise à jour réussie',
          detail: 'La ressource a été mise à jour avec succès.',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la ressource :', error);

        // Afficher un message d'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de mise à jour',
          detail:
            'Une erreur est survenue lors de la mise à jour de la ressource.',
        });
      },
    });
  }

  showCreateRessourceDialog() {
    // Définir displayCreateTrainingDialog sur false
    this.displayCreateRessources = false;
    setTimeout(() => {
      this.displayCreateRessources = true;
    }, 1);
  }

  onRessourceCreated(ressource: Ressource): void {
    // Ajouter la nouvelle ressource à la liste
    this.Ressource.push(ressource);
    this.filteredRessources = [...this.Ressource];
  }

  confirmDelete(ressource: Ressource): void {
    this.confirmationService.confirm({
      message: `Voulez-vous vraiment supprimer la ressource ${ressource.name}?`,
      accept: () => {
        this.deleteRessource(ressource.id);
      },
    });
  }

  deleteRessource(resourceId: number): void {
    this.ressourceService.deleteRessource(resourceId).subscribe(
      (response: any) => {
        console.log(response);
        this.Ressource = this.Ressource.filter((r) => r.id !== resourceId);
        this.filteredRessources = [...this.Ressource];
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression réussie',
          detail: response.message,
        });
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: error.error.message,
        });
      }
    );
  }
}
