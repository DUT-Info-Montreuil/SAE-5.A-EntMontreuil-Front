import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource.model';

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

  ngOnInit(): void {
    this.Ressource = [
      {
        id: 1,
        name: "Qualité d'algo",
        trainingId: 101,
        training: 'devloppement',
        color: '#FF5733',
      },
      {
        id: 2,
        name: 'analyse de donnée',
        trainingId: 102,
        training: 'DATA',
        color: '#33FF57',
      },
      {
        id: 3,
        name: 'sécu',
        trainingId: 103,
        training: 'Cyber sécurité',
        color: '#3357FF',
      },
      // ... ajoutez plus de fausses ressources si nécessaire ...
    ];
    this.filteredRessources = this.Ressource;
    console.log(this.displayCreateRessources);
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
