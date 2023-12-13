import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CohortService } from 'src/app/core/services/cohort.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
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
export class TrainingComponent implements OnInit {
  // trainingInfo!: Training;

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService
  ) {}

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        /* this.cohortService.getTrainingInfo(id).subscribe(
          (data) => {
            this.trainingInfo = data; // Stockez les données reçues dans la variable
            // console.log(this.degreeInfo);  // Affichez les données dans la console pour vérifier
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des informations de degree:',
              error
            );
          }
        ); */
      }
    });
  }
}
