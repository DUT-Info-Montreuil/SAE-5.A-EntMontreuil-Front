import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
})
export class TdComponent implements OnInit {
  TDInfo!: TD;

  isAddTPDialogVisible: boolean = false; // Pour contrôler l'affichage du modal
  newTPName: string = '';

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private cohortSharedService: CohortSharedService
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
}

