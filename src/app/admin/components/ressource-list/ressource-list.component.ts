import { Component } from '@angular/core';
import { Ressource } from '../../models/ressource.model';

@Component({
  selector: 'app-ressource-list',
  templateUrl: './ressource-list.component.html',
  styleUrls: ['./ressource-list.component.scss'],
})
export class RessourceListComponent {
  onSearch() {
    throw new Error('Method not implemented.');
  }
  showCreateRessourceDialog() {
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
      { id: 1, name: 'Ressource 1', trainingId: 101, color: '#FF5733' },
      { id: 2, name: 'Ressource 2', trainingId: 102, color: '#33FF57' },
      { id: 3, name: 'Ressource 3', trainingId: 103, color: '#3357FF' },
      // ... ajoutez plus de fausses ressources si nécessaire ...
    ];
    this.filteredRessources = this.Ressource;
  }
}
