import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TrainingService } from 'src/app/core/services/trainings.service';
import { Ressource } from '../../models/ressource.model';
import { Training } from '../../models/training.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-ressource',
  templateUrl: './create-ressource.component.html',
  styleUrls: ['./create-ressource.component.scss'],
})
export class CreateRessourceComponent implements OnInit {
  @Input() displayCreateRessourceDialog: boolean = false;
  @Input() trainings: Training[] = [];
  @Output() ressourceCreated: EventEmitter<Ressource> =
    new EventEmitter<Ressource>();

  newRessourceName: string = '';
  selectedTrainingId!: number;
  ressourceColor: string = '';
  loading: boolean = false;

  constructor(
    private trainingService: TrainingService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Fetch the list of trainings for the dropdown
    this.showCreateRessourceDialog();
  }

  showCreateRessourceDialog(): void {
    this.displayCreateRessourceDialog = true;
  }

  closeCreateRessourceDialog(): void {
    this.displayCreateRessourceDialog = false;
  }

  isFormValid(): boolean {
    return (
      !!this.newRessourceName.trim() &&
      !!this.selectedTrainingId &&
      !!this.ressourceColor.trim()
    );
  }

  createRessource(): void {
    this.loading = true;

    if (!this.isFormValid()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez saisir tous les champs requis pour la ressource.',
      });

      this.loading = false;
      return; // Sortez de la fonction si le formulaire n'est pas valide
    }

    let ressource: Ressource = {
      id: 0, // ID temporaire, sera mis à jour après la création
      name: this.newRessourceName.trim(),
      training: '',
      trainingId: this.selectedTrainingId,
      color: this.ressourceColor.trim(),
    };

    // Implémentez la logique d'ajout de la ressource ici...
    // Par exemple : this.ressourceService.addRessource(ressource).subscribe(...)
  }
}
