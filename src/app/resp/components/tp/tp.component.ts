import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CohortStudent } from 'src/app/core/models/cohort-students.model';
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

  selectedStudents: CohortStudent[] = [];
  students!: CohortStudent[];
  metaKeySelection: boolean = true;

  selectedStudentIds: number[] = [];

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
          this.students = data;
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

  onRowSelect(event: any) {
    this.selectedStudentIds.push(event.data.student_id);
    console.log('Selected IDs:', this.selectedStudentIds);
  }

  onRowUnselect(event: any) {
    this.selectedStudentIds = this.selectedStudentIds.filter(id => id !== event.data.student_id);
    console.log('Selected IDs:', this.selectedStudentIds);
  }

  // Méthode pour ajouter un TP
  addStudents() {
    // Appeler l'API pour ajouter le nouveau TP
    this.cohortService.addStudentsToTP(this.TPInfo.id, this.selectedStudentIds).subscribe(
      response => {
        // Gérer l'ajout réussi
        this.isAddStudentsDialogVisible = false; // Fermer le dialogue
        this.selectedStudentIds = []; // Réinitialiser les étudiants sélectionnés
        this.selectedStudents = []; // Réinitialiser les étudiants sélectionnés

        // Rappeler getPromotionInfo pour actualiser les données
        this.refreshTPData();
      },
      error => {
        // Gérer l'erreur
        console.error("Erreur lors de l'ajout des étudiants au TP: ", error);
      }
    );
  }

  refreshTPData() {
    const tpId = this.route.snapshot.paramMap.get('id');
    if (tpId) {
      this.cohortService.getTPInfo(tpId).subscribe(
        data => {
          this.TPInfo = data;
        },
        error => {
          console.error('Erreur lors de la récupération des informations du TP:', error);
        }
      );
    }
  }
}
