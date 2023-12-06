import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource.model';
import { RessourceService } from 'src/app/core/services/ressources.service';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.scss'],
})
export class RessourceListComponent {
  confirmDelete(arg0: any) {
    throw new Error('Method not implemented.');
  }
  startEditing(arg0: any) {
    throw new Error('Method not implemented.');
  }
  onSearch() {
    throw new Error('Method not implemented.');
  }

  Ressource: Ressource[] = [];
  filteredRessources: Ressource[] = [];
  searchQuery: string = '';
  scroll = 'scroll';
  displayCreateRessources: boolean = false;

  isLoading: boolean = false;

  constructor(private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.loadRessources();
  }

  loadRessources(): void {
    this.isLoading = true;
    this.ressourceService.getRessources().subscribe(
      (ressources) => {
        this.Ressource = ressources;
        this.filteredRessources = [...this.Ressource];
        this.isLoading = false;
        console.log(this.filteredRessources);
      },
      (error) => {
        // Gérer l'erreur ici
        console.error('Erreur lors du chargement des ressources', error);
        this.isLoading = false;
      }
    );
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
}
