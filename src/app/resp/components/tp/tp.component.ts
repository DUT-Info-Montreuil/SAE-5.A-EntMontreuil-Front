import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, Message, MessageService } from 'primeng/api';
import { CohortStudent } from 'src/app/core/models/cohort-students.model';
import { TP } from 'src/app/core/models/cohort-tp.model';
import { CohortService } from 'src/app/core/services/cohort.service';
import { CohortSharedService } from 'src/app/shared/services/cohort-shared.service';

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
  providers: [MessageService],
})
export class TpComponent implements OnInit {

  TPInfo!: TP;

  private _isAddStudentsDialogVisible = false;

  loading: boolean = false;

  selectedStudents: CohortStudent[] = [];
  students!: CohortStudent[];
  metaKeySelection: boolean = true;

  selectedStudentIds: number[] = [];

  onlyNoSubGroup: boolean = false;
  displayedStudents: CohortStudent[] = [];

  searchQuery: string = '';

  selectedMenu: string = 'promo';

  menuItemsStudents: MenuItem[] | undefined; // Menu des actions pour les étudiants

  menuSelectedStudentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cohortService: CohortService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cohortSharedService: CohortSharedService
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
          this.cohortService.removeStudentFromDegree(this.menuSelectedStudentId!).subscribe(
            (data) => {
              console.log(data);
              this.refreshTPData();

              // Afficher un toast de succès
              this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Cet étudiant a été retiré de la formation.'
              });
            },
            (error) => {
              console.error(
                'Erreur lors de la suppression de l\'étudiant de la formation:',
                error
              );

              this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Une erreur s\'est produite.'
              });
            }
          );
        },
      },
    ];
  }

  selectMenuStudent(studentId: number) {
    this.menuSelectedStudentId = studentId;
  }

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    if (menu === 'all') {
      this.loadAllStudents();
    } else if (menu === 'promo') {
      this.loadStudents();
    }
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

  loadAllStudents() {
    this.cohortService.getStudentsAll().subscribe(
      data => {
        this.students = data;
        this.filterStudents(); // Appliquez les filtres actuels aux nouvelles données
      },
      error => {
        console.error("Erreur lors de la récupération de tous les étudiants: ", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Impossible de charger tous les étudiants."
        });
      }
    );
  }

  loadStudents() {
    const promoId = this.TPInfo ? this.TPInfo.promotion.id : null;
    if (promoId) {
      this.cohortService.getStudentsInPromo(promoId).subscribe(
        data => {
          this.students = data;
          this.filterStudents(); // Appliquez les filtres actuels aux nouvelles données
        },
        error => {
          console.error(
            'Erreur lors de la récupération des étudiants dans la promotion:',
            error
          );
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: "Impossible de charger les étudiants de la promotion."
          });
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
    this.loading = true;

    this.cohortService.addStudentsToTP(this.TPInfo.id, this.selectedStudentIds).subscribe(
      response => {
        this.isAddStudentsDialogVisible = false;
        this.selectedStudentIds = [];
        this.selectedStudents = [];
        this.displayedStudents = [];
        this.selectedMenu = 'promo';
        this.refreshTPData();

        // Afficher un toast de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Les étudiants ont été ajoutés avec succès.'
        });

        this.loading = false
      },
      error => {
        console.error("Erreur lors de l'ajout des étudiants au TP: ", error);

        // Afficher un toast d'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: "Une erreur est survenue lors de l'ajout des étudiants."
        });

        this.loading = false
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

  filterNoSubGroup() {
    if (this.onlyNoSubGroup) {
      this.displayedStudents = this.students.filter(student =>
        student.td_name === null || student.tp_name === null);
    } else {
      this.displayedStudents = this.students;
    }
  }

  filterStudents() {
    let filteredStudents = this.students;

    // Filtrer par onlyNoSubGroup si activé
    if (this.onlyNoSubGroup) {
      filteredStudents = filteredStudents.filter(student =>
        student.td_name === null || student.tp_name === null);
    }

    // Filtrer par recherche si nécessaire
    if (this.searchQuery) {
      filteredStudents = filteredStudents.filter(student =>
        student.first_name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.last_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }

    this.displayedStudents = filteredStudents;
  }

  confirmDeleteTP() {
    this.confirmationService.confirm({
      message: 'L\'action de suppression du TP entraînera le retrait des étudiants qui y sont actuellement affectés. Voulez-vous vraiment supprimer ce TP ?',
      accept: () => {
        this.deleteTP(this.TPInfo.id);
      }
    });
  }

  deleteTP(tpId: number) {
    this.cohortService.deleteTP(tpId).subscribe(
      response => {
        // Gestion de la réponse, par exemple, afficher un message de succès
        this.messageService.add({
          severity: 'success',
          summary: 'Suppression réussie',
          detail: 'Le TP a été supprimé avec succès.'
        });

        this.cohortSharedService.triggerRefresh();
        this.router.navigate(['/resp/cohort/td/', this.TPInfo.td.id]);
      },
      error => {
        // Gestion de l'erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la suppression du TP.'
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