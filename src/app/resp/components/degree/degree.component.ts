import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Degree } from 'src/app/core/models/cohort-degree.model';
import { CohortService } from 'src/app/core/services/cohort.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss'],
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
export class DegreeComponent implements OnInit {
  degreeInfo!: Degree;

  menuItemsStudents: MenuItem[] | undefined; // Menu des actions pour les étudiants

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getDegreeInfo(id).subscribe(
          (data) => {
            this.degreeInfo = data; // Stockez les données reçues dans la variable
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

    // Créer le menu des actions pour les étudiants
    this.menuItemsStudents = [
      {
        label: 'Voir',
        icon: 'pi pi-eye',
        command: () => { },
      },
      {
        label: 'Éditer',
        icon: 'pi pi-pencil',
        command: () => { },
      },
      {
        label: 'Retirer de la formation',
        icon: 'pi pi-times',
        command: () => {

        },
      },
    ];
  }

  getStudentCountByPromotion(id_promotion: number): number {
    return (
      this.students?.filter((student) => student.id_promotion === id_promotion)
        .length || 0
    );
  }

  get promotions() {
    return this.degreeInfo?.promotions;
  }

  get students() {
    return this.degreeInfo?.students;
  }
}
