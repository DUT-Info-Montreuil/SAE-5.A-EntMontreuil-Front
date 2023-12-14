import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Training } from 'src/app/admin/models/training.model';
import { Promotion } from 'src/app/core/models/cohort-promotion.model';
import { CohortService } from 'src/app/core/services/cohort.service';
import { TrainingService } from 'src/app/core/services/trainings.service';
import { CohortSharedService } from 'src/app/shared/services/cohort-shared.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
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
export class PromotionComponent implements OnInit {
  promotionInfo!: Promotion;

  isAddTrainingDialogVisible: boolean = false; // Pour contrôler l'affichage du modal
  newTraining = { name: '', semester: 0 };

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private trainingService: TrainingService,
    private cohortSharedService: CohortSharedService
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getPromotionInfo(id).subscribe(
          (data) => {
            this.promotionInfo = data; // Stockez les données reçues dans la variable
            // console.log(this.degreeInfo);  // Affichez les données dans la console pour vérifier
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


  // Méthode pour ajouter un parcours
  addTraining() {
    if (this.newTraining.name && this.newTraining.semester) {
      const promotionId = this.route.snapshot.paramMap.get('id');
      if (promotionId) {
        let training = new Training(
          0, // ID sera défini par le backend
          this.newTraining.name,
          +promotionId, // Assurez-vous que c'est un nombre
          this.newTraining.semester
        );

        this.trainingService.addTraining(training).subscribe(
          response => {
            console.log('Parcours ajouté', response);
            this.isAddTrainingDialogVisible = false;

            // Rappeler getPromotionInfo pour actualiser les données
            this.refreshPromotionData();
            this.cohortSharedService.triggerRefresh();
          },
          error => {
            console.error("Erreur lors de l'ajout du parcours", error);
          }
        );
      }
    }
  }

  refreshPromotionData() {
    const promotionId = this.route.snapshot.paramMap.get('id');
    if (promotionId) {
      this.cohortService.getPromotionInfo(promotionId).subscribe(
        data => {
          this.promotionInfo = data;
        },
        error => {
          console.error('Erreur lors de la récupération des informations de promotion:', error);
        }
      );
    }
  }

}
