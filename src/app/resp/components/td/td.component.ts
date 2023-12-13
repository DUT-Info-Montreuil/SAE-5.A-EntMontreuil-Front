import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TD } from 'src/app/core/models/cohort-td.model';
import { CohortService } from 'src/app/core/services/cohort.service';

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

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService
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
}

