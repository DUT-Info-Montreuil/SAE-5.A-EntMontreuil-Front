import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource.model';
import { RessourceService } from 'src/app/core/services/ressources.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateRessources: boolean = false;

  isLoading: boolean = false;

  constructor(
    private ressourceService: RessourceService,
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
        this.Ressource = ressources.map((ressource) => ({
          ...ressource,
          isEditing: false, // Définir isEditing à false pour chaque ressource
        }));
        this.filteredRessources = [...this.Ressource];
        this.isLoading = false;
        console.log(this.filteredRessources);
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

  saveChanges(ressource: Ressource) {
    ressource.is_editing = false;
    console.log(ressource);
  }
  showCreateRessourceDialog() {
    // Définir displayCreateTrainingDialog sur false
    this.displayCreateRessources = false;

    // Ajouter un délai de 1 seconde (vous pouvez ajuster la durée)
    setTimeout(() => {
      // Définir displayCreateTrainingDialog sur true après le délai
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
