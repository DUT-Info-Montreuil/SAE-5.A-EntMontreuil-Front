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
  Ressource: Ressource[] = [];
  filteredRessources: Ressource[] = [];
  trainings: Training[] = [];
  selectedTrainingId: number | null = null;
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
    this.trainingService.getAllTrainings().subscribe((trainings) => {
      this.trainings = trainings.map(
        (t) => new Training(t.id, t.name, 0, 'default')
      );
      console.log(this.trainings);

      // Charger les ressources après avoir chargé les parcours
      this.ressourceService.getRessources().subscribe(
        (ressources) => {
          this.Ressource = ressources.map((ressource) => {
            // Trouver le parcours correspondant
            const training = this.trainings.find(
              (t) => t.id === ressource.id_Training
            );
            return {
              ...ressource,
              isEditing: false,
              training_name: training ? training.name : 'Inconnu',
            };
          });
          this.filteredRessources = [...this.Ressource];
          console.log(this.Ressource);
          this.isLoading = false;
        },
        (error) => {
          // Gérer l'erreur ici
          this.isLoading = false;
        }
      );
    });
  }

  filterByTraining(): void {
    if (this.selectedTrainingId) {
      // Assurez-vous que selectedTrainingId est un nombre si id_Training est un nombre
      const selectedId = Number(this.selectedTrainingId);

      this.filteredRessources = this.Ressource.filter(
        (ressource) => ressource.id_Training === selectedId
      );
    } else {
      // Si aucune formation n'est sélectionnée, affichez toutes les ressources
      this.filteredRessources = [...this.Ressource];
    }
  }

  onSearch(): void {
    // Assurez-vous que searchQuery est une chaîne de caractères
    const query = this.searchQuery.toLowerCase();

    if (!query) {
      // Si la requête de recherche est vide, affichez toutes les ressources
      this.filteredRessources = [...this.Ressource];
    } else {
      // Filtrer les ressources en fonction de la requête de recherche
      this.filteredRessources = this.Ressource.filter(
        (ressource) =>
          ressource.name.toLowerCase().includes(query) ||
          ressource.training_name.toLowerCase().includes(query)
      );
    }
  }

  startEditing(ressource: Ressource) {
    ressource.is_editing = true;
    ressource.originalName = ressource.name;
    ressource.originalId_Training = ressource.id_Training;
    ressource.originalColor = ressource.color;
  }

  cancelEdit(ressource: Ressource) {
    ressource.name = ressource.originalName;
    ressource.id_Training = ressource.originalId_Training;
    ressource.color = ressource.originalColor;
    ressource.is_editing = false;
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
        const ressourceTrainingId = Number(ressource.id_Training);
        const training = this.trainings.find(
          (t) => t.id === ressourceTrainingId
        );

        if (training) {
          ressource.training_name = training.name;
        } else {
          ressource.training_name = 'Inconnu';
          console.warn(
            `Aucune formation trouvée pour l'ID ${ressource.id_Training}`
          );
        }

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
