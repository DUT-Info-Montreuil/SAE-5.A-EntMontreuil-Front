import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CohortPromoStudent } from 'src/app/core/models/cohort-promo-students.model';
import { TP } from 'src/app/core/models/cohort-tp.model';
import { CohortService } from 'src/app/core/services/cohort.service';

@Component({
  selector: 'app-tp',
  templateUrl: './tp.component.html',
  styleUrls: ['./tp.component.scss'],
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
export class TpComponent implements OnInit {

  TPInfo!: TP;

  private _isAddStudentsDialogVisible = false;

  selectedStudents!: CohortPromoStudent;
  promoStudents: CohortPromoStudent[] = [];
  metaKeySelection: boolean = true;

  selectedMenu: string = 'promo';

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService
  ) { }

  ngOnInit() {
    // Récupérer les informations de la formation (degree) depuis l'API

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.cohortService.getTPInfo(id).subscribe(
          (data) => {
            this.TPInfo = data; // Stockez les données reçues dans la variable
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

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }

  get isAddStudentsDialogVisible(): boolean {
    return this._isAddStudentsDialogVisible;
  }

  set isAddStudentsDialogVisible(value: boolean) {
    this._isAddStudentsDialogVisible = value;
    if (value) {
      this.loadStudents(); // Charger les étudiants lorsque le dialogue est ouvert
    }
  }

  loadStudents() {
    const promoId = this.TPInfo ? this.TPInfo.promotion.id : null;
    if (promoId) {
      this.cohortService.getStudentsInPromo(promoId).subscribe(
        (data) => {
          this.promoStudents = data;
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des étudiants dans la promotion:',
            error
          );
        }
      );
    }
  }

  // Méthode pour ajouter un TP
  addStudents() {

  }
}
