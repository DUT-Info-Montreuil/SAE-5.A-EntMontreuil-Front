import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TD } from 'src/app/core/models/cohort-td.model';
import { SingleTP } from 'src/app/core/models/single-tp.model';
import { CohortService } from 'src/app/core/services/cohort.service';
import { CohortSharedService } from 'src/app/shared/services/cohort-shared.service';

@Component({
  selector: 'app-td',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-tabview-panels {
        padding: 0;
        padding-top: 1.5em;
      }
      :host ::ng-deep th {
        background-color: transparent !important;
      }
    `,
  ],
  providers: [MessageService],
})
export class TdComponent implements OnInit {
  TDInfo!: TD;

  isAddTPDialogVisible: boolean = false; // Pour contrôler l'affichage du modal
  newTPName: string = '';

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private cohortSharedService: CohortSharedService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getTDInfo(id).subscribe(
          (data) => {
            this.TDInfo = data; // Stockez les données reçues dans la variable
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des informations de degree:',
              error
            );
          }
        );
      }
    });
  }

  // Méthode pour ajouter un TP
  addTP() {
    // Créer un nouvel objet TD
    const newTP: SingleTP = {
      id: 0,
      name: this.newTPName,
      id_td: this.TDInfo.id
    };

    // Appeler l'API pour ajouter le nouveau TD
    this.cohortService.addTP(newTP).subscribe(
      response => {
        // Gérer l'ajout réussi
        this.TDInfo.tps.push(response); // Mettre à jour la liste locale des TDs
        this.isAddTPDialogVisible = false; // Fermer le dialogue
        this.newTPName = ''; // Réinitialiser le nom du TD

        // Rappeler getPromotionInfo pour actualiser les données
        this.refreshTDData();
        this.cohortSharedService.triggerRefresh();
      },
      error => {
        // Gérer l'erreur
        console.error("Erreur lors de l'ajout du TP: ", error);
      }
    );
  }

  refreshTDData() {
    const tdId = this.route.snapshot.paramMap.get('id');
    if (tdId) {
      this.cohortService.getTDInfo(tdId).subscribe(
        data => {
          this.TDInfo = data;
        },
        error => {
          console.error('Erreur lors de la récupération des informations du TD:', error);
        }
      );
    }
  }

  confirmDeleteTD() {
    this.confirmationService.confirm({
      message: 'L\'action de suppression du TD entraînera également la suppression des TP associés et le retrait des étudiants qui y sont actuellement affectés. Voulez-vous vraiment supprimer ce TD ?',
      accept: () => {
        this.deleteTD(this.TDInfo.id);
      }
    });
  }

  deleteTD(tdId: number) {
    this.cohortService.deleteTD(tdId).subscribe(
      response => {
        // Gestion de la réponse, par exemple, afficher un message de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression réussie',
          detail: 'Le TD a été supprimé avec succès.'
        });

        this.cohortSharedService.triggerRefresh();
        this.router.navigate(['/resp/cohort/training/', this.TDInfo.training.id]);
      },
      error => {
        // Gestion de l'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la suppression du TD.'
        });
      }
    );
  }
}

/*ENT Montreuil is a Desktop Working Environnement for the students of the IUT of Montreuil
    Copyright (C) 2024  Steven CHING, Emilio CYRIAQUE-SOURISSEAU ALVARO-SEMEDO, Ismail GADA, Yanis HAMANI, Priyank SOLANKI

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.*/